import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadPlatformData } from './platformApi';

describe('loadPlatformData', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('normalizes paginated tool records from the API', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/tools/')) {
        return {
          ok: true,
          json: async () => ({
            results: [
              {
                id: 'tool-1',
                name: 'QGIS',
                category: 'GIS & Spatial',
                description: 'Desktop GIS',
                detailed_specs: 'SCP plugin',
                pricing: 'Free',
                is_beginner_friendly: false,
                featured: true,
                tags: ['GIS'],
                url: 'https://qgis.org',
              },
            ],
          }),
        };
      }

      return {
        ok: true,
        json: async () => [],
      };
    });
    vi.stubGlobal('fetch', fetchMock);

    const data = await loadPlatformData();

    expect(data.tools).toEqual([
      {
        id: 'tool-1',
        name: 'QGIS',
        category: 'GIS & Spatial',
        description: 'Desktop GIS',
        detailedSpecs: 'SCP plugin',
        pricing: 'Free',
        isBeginnerFriendly: false,
        featured: true,
        tags: ['GIS'],
        url: 'https://qgis.org',
      },
    ]);
    expect(data.prompts).toEqual([]);
  });

  it('returns null for a collection when that endpoint fails', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/tools/')) {
        return {
          ok: false,
          status: 500,
          json: async () => ({}),
        };
      }

      return {
        ok: true,
        json: async () => [],
      };
    });
    vi.stubGlobal('fetch', fetchMock);

    const data = await loadPlatformData();
    expect(data.tools).toBeNull();
    expect(data.jobs).toEqual([]);
  });
});
