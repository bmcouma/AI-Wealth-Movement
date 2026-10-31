import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  TOOLS_DATA,
  PROMPTS_DATA,
  JOBS_DATA,
  GIS_RESOURCES,
  LEARNING_COURSES,
} from "../src/data/platformData";

const datasets = {
  tools: TOOLS_DATA,
  prompts: PROMPTS_DATA,
  opportunities: JOBS_DATA,
  gis: GIS_RESOURCES,
  learning: LEARNING_COURSES,
};

const outputPath = resolve(process.cwd(), "backend", "seed_data.json");

writeFileSync(outputPath, JSON.stringify(datasets, null, 2), "utf8");

console.log("Export complete:", outputPath);
for (const [name, records] of Object.entries(datasets)) {
  console.log(`${name}: ${records.length} records`);
}
