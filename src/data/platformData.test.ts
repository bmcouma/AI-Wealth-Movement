import { describe, expect, it } from 'vitest';
import { JOBS_DATA, TOOLS_DATA } from './platformData';

describe('TOOLS_DATA', () => {
  it('assigns a unique id to every tool', () => {
    const ids = TOOLS_DATA.map((tool) => tool.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes at least one featured GIS and Spatial tool', () => {
    expect(
      TOOLS_DATA.some(
        (tool) => tool.featured && tool.category === 'GIS & Spatial'
      )
    ).toBe(true);
  });
});

describe('JOBS_DATA', () => {
  it('keeps required job fields populated', () => {
    expect(JOBS_DATA.length).toBeGreaterThan(0);
    for (const job of JOBS_DATA) {
      expect(job.title.length).toBeGreaterThan(0);
      expect(job.skills.length).toBeGreaterThan(0);
      expect(job.url).toMatch(/^https?:\/\//);
    }
  });
});
