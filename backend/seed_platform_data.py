import json
import os
from pathlib import Path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

from apps.tools.models import AITool
from apps.prompts.models import PromptItem
from apps.opportunities.models import AIJob
from apps.gis_hub.models import GisResource
from apps.learning.models import LearningCourse

DATA_FILE = Path(__file__).resolve().parent / "seed_data.json"

if not DATA_FILE.exists():
    raise SystemExit(
        f"Seed file not found: {DATA_FILE}. "
        "Run the frontend export script first."
    )

with DATA_FILE.open("r", encoding="utf-8") as file:
    data = json.load(file)


def import_records(label, records, model, mapper):
    created = 0
    updated = 0

    for record in records:
        values = mapper(record)
        record_id = values.pop("id")

        _, was_created = model.objects.update_or_create(
            id=record_id,
            defaults=values,
        )

        if was_created:
            created += 1
        else:
            updated += 1

    print(
        f"{label}: {created} created, "
        f"{updated} updated, {model.objects.count()} total"
    )


import_records(
    "Tools",
    data.get("tools", []),
    AITool,
    lambda x: {
        "id": x["id"],
        "name": x["name"],
        "category": x["category"],
        "description": x.get("description", ""),
        "detailed_specs": x.get("detailedSpecs") or "",
        "pricing": x.get("pricing") or "",
        "is_beginner_friendly": x.get("isBeginnerFriendly", False),
        "featured": x.get("featured", False),
        "tags": x.get("tags") or [],
        "url": x.get("url") or None,
    },
)

import_records(
    "Prompts",
    data.get("prompts", []),
    PromptItem,
    lambda x: {
        "id": x["id"],
        "title": x["title"],
        "category": x["category"],
        "task": x.get("task") or "",
        "template": x["template"],
        "variables": x.get("variables") or [],
        "default_values": x.get("defaultValues") or {},
        "instructions": x.get("instructions")
            or (x.get("defaultValues") or {}).get("instructions")
            or "",
    },
)

import_records(
    "Opportunities",
    data.get("opportunities", []),
    AIJob,
    lambda x: {
        "id": x["id"],
        "title": x["title"],
        "category": x["category"],
        "type": x["type"],
        "location": x["location"],
        "experience": x["experience"],
        "salary_range": x.get("salaryRange") or "",
        "skills": x.get("skills") or [],
        "description": x.get("description", ""),
        "responsibilities": x.get("responsibilities") or [],
        "qualifications": x.get("qualifications") or [],
        "posted_date": x.get("postedDate") or "",
        "is_sample": x.get("isSample", False),
        "url": x.get("url") or None,
    },
)

import_records(
    "GIS resources",
    data.get("gis", []),
    GisResource,
    lambda x: {
        "id": x["id"],
        "title": x["title"],
        "level": x["level"],
        "tech_stack": x.get("techStack") or [],
        "summary": x.get("summary") or "",
        "use_case": x.get("useCase") or "",
        "read_time": x.get("readTime") or "",
        "steps": x.get("steps") or [],
    },
)

import_records(
    "Learning courses",
    data.get("learning", []),
    LearningCourse,
    lambda x: {
        "id": x["id"],
        "title": x["title"],
        "category": x["category"],
        "difficulty": x["difficulty"],
        "duration": x["duration"],
        "description": x["description"],
        "outcomes": x.get("outcomes") or [],
        "modules": x.get("modules") or [],
    },
)

print("\nImport completed.")
