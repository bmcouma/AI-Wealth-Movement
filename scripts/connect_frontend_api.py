from pathlib import Path
from datetime import datetime
import re
import shutil

app_path = Path("src/App.tsx")
source = app_path.read_text(encoding="utf-8")

if 'from "./services/platformApi"' in source:
    raise SystemExit(
        "App.tsx already imports platformApi. No changes made."
    )

anchor = "export default function App() {"
if anchor not in source:
    raise SystemExit("Could not locate the App component. No changes made.")

# Back up the original file first.
stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = app_path.with_name(f"App.tsx.backup_{stamp}")
shutil.copy2(app_path, backup)

# Preserve the existing imports and local arrays as fallback data.
head, body = source.split(anchor, 1)

# Replace references in the component body only.
replacements = {
    "TOOLS_DATA": "apiTools",
    "PROMPTS_DATA": "apiPrompts",
    "JOBS_DATA": "apiJobs",
    "GIS_RESOURCES": "apiGisResources",
    "LEARNING_COURSES": "apiLearningCourses",
}

for old, new in replacements.items():
    body = re.sub(rf"\b{old}\b", new, body)

state_anchor = (
    "  const [toastMessage, setToastMessage] = "
    "useState<string | null>(null);"
)

if state_anchor not in body:
    raise SystemExit(
        "Could not locate the expected state declaration. "
        f"Original backup: {backup}"
    )

state_block = '''
  // API-backed datasets; local arrays remain as fallback data.
  const [apiTools, setApiTools] = useState<AITool[]>(TOOLS_DATA);
  const [apiPrompts, setApiPrompts] = useState<PromptItem[]>(PROMPTS_DATA);
  const [apiJobs, setApiJobs] = useState<AIJob[]>(JOBS_DATA);
  const [apiGisResources, setApiGisResources] =
    useState<GisResource[]>(GIS_RESOURCES);
  const [apiLearningCourses, setApiLearningCourses] =
    useState<LearningCourse[]>(LEARNING_COURSES);

  useEffect(() => {
    let cancelled = false;

    import("./services/platformApi")
      .then(({ loadPlatformData }) => loadPlatformData())
      .then((data) => {
        if (cancelled) return;

        if (data.tools !== null) setApiTools(data.tools);
        if (data.prompts !== null) setApiPrompts(data.prompts);
        if (data.jobs !== null) setApiJobs(data.jobs);
        if (data.gis !== null) {
          setApiGisResources(data.gis);
          if (data.gis.length > 0) {
            setGisActiveWorkflow(data.gis[0]);
          }
        }
        if (data.learning !== null) setApiLearningCourses(data.learning);
      })
      .catch((error) => {
        console.error("Platform data loading failed:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);
'''

body = body.replace(
    state_anchor,
    state_anchor + "\n" + state_block,
    1
)

# Add the service import.
head = head.rstrip() + '\nimport { loadPlatformData } from "./services/platformApi";\n'

# Use the statically imported function, rather than a dynamic import.
body = body.replace(
    '    import("./services/platformApi")\n      .then(({ loadPlatformData }) => loadPlatformData())',
    '    loadPlatformData()',
    1
)

app_path.write_text(head + anchor + body, encoding="utf-8")
print(f"Updated {app_path}")
print(f"Backup saved to {backup}")
