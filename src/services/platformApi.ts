import type {
  AITool,
  PromptItem,
  AIJob,
  GisResource,
  LearningCourse,
} from "../types";

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1"
).replace(/\/+$/, "");

async function fetchRecords<T>(
  endpoint: string,
  normalize: (record: any) => T
): Promise<T[] | null> {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}/`);

    if (!response.ok) {
      throw new Error(`API returned HTTP ${response.status}`);
    }

    const payload = await response.json();
    const records = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.results)
        ? payload.results
        : null;

    if (!records) {
      throw new Error(`Unexpected response from ${endpoint}`);
    }

    return records.map(normalize);
  } catch (error) {
    console.warn(
      `Could not load ${endpoint}; retaining local fallback data.`,
      error
    );
    return null;
  }
}

export async function loadPlatformData() {
  const [tools, prompts, jobs, gis, learning] = await Promise.all([
    fetchRecords<AITool>("tools", (x) => ({
      id: x.id,
      name: x.name,
      category: x.category,
      description: x.description,
      detailedSpecs: x.detailed_specs ?? "",
      pricing: x.pricing ?? "Free",
      isBeginnerFriendly: x.is_beginner_friendly ?? false,
      featured: x.featured ?? false,
      tags: x.tags ?? [],
      url: x.url ?? "",
    })),

    fetchRecords<PromptItem>("prompts", (x) => ({
      id: x.id,
      title: x.title,
      category: x.category,
      task: x.task ?? "",
      template: x.template,
      variables: x.variables ?? [],
      defaultValues: x.default_values ?? {},
      instructions: x.instructions ?? "",
    })),

    fetchRecords<AIJob>("opportunities", (x) => ({
      id: x.id,
      title: x.title,
      category: x.category,
      type: x.type,
      location: x.location,
      experience: x.experience,
      salaryRange: x.salary_range ?? "",
      skills: x.skills ?? [],
      description: x.description,
      responsibilities: x.responsibilities ?? [],
      qualifications: x.qualifications ?? [],
      postedDate: x.posted_date ?? "",
      isSample: x.is_sample ?? false,
      url: x.url ?? "",
    })),

    fetchRecords<GisResource>("gis", (x) => ({
      id: x.id,
      title: x.title,
      level: x.level,
      techStack: x.tech_stack ?? [],
      summary: x.summary ?? "",
      useCase: x.use_case ?? "",
      readTime: x.read_time ?? "",
      steps: x.steps ?? [],
    })),

    fetchRecords<LearningCourse>("learning", (x) => ({
      id: x.id,
      title: x.title,
      category: x.category,
      difficulty: x.difficulty,
      duration: x.duration,
      description: x.description,
      outcomes: x.outcomes ?? [],
      modules: x.modules ?? [],
    })),
  ]);

  return { tools, prompts, jobs, gis, learning };
}
