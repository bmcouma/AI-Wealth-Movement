from pathlib import Path
from datetime import datetime
import re

app = Path("src/App.tsx")
source = app.read_text(encoding="utf-8")

if "submitContactMessage" in source:
    print("Contact API import or handler already exists. No changes made.")
    raise SystemExit(0)

pattern = re.compile(
    r"  // Handle contact form submit\s+"
    r"const handleContactSubmit = \(e: React\.FormEvent\) => \{.*?"
    r"\n  \};",
    re.DOTALL,
)

replacement = """  // Submit contact messages to the Django API
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = contactMessage.name.trim();
    const email = contactMessage.email.trim();
    const message = contactMessage.message.trim();

    if (!name || !email || !message) {
      triggerToast('Please fill out all contact fields.');
      return;
    }

    setContactSent(true);

    try {
      await submitContactMessage({
        name,
        email,
        subject: 'Website contact form',
        message,
      });

      setContactMessage({ name: '', email: '', message: '' });
      triggerToast('Message sent successfully. Thank you for contacting us.');
    } catch (error) {
      triggerToast(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.'
      );
    } finally {
      setContactSent(false);
    }
  };"""

updated, count = pattern.subn(lambda _: replacement, source, count=1)

if count != 1:
    print("STOP: Could not locate the expected contact handler.")
    print("No changes were written. Send me the current handler code.")
    raise SystemExit(1)

import_line = 'import { submitContactMessage } from "./services/contactApi";'

if "from './services/platformApi'" in updated:
    updated = updated.replace(
        "import { loadPlatformData } from './services/platformApi';",
        "import { loadPlatformData } from './services/platformApi';\n" + import_line,
        1,
    )
elif 'from "./services/platformApi"' in updated:
    updated = updated.replace(
        'import { loadPlatformData } from "./services/platformApi";',
        'import { loadPlatformData } from "./services/platformApi";\n' + import_line,
        1,
    )
else:
    # Insert after the final import statement.
    matches = list(re.finditer(r"^import .*?;\s*$", updated, re.MULTILINE))
    if not matches:
        print("STOP: Could not safely locate the import section.")
        raise SystemExit(1)
    pos = matches[-1].end()
    updated = updated[:pos] + "\n" + import_line + updated[pos:]

backup = app.with_name(
    f"App.tsx.backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
)
backup.write_text(source, encoding="utf-8")
app.write_text(updated, encoding="utf-8")

print(f"Contact handler updated. Backup: {backup}")
