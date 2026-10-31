import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitContactMessage } from './contactApi';

describe('submitContactMessage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts a JSON payload to the contact endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await submitContactMessage({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hello',
      message: 'I would like to contribute a GIS resource.',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/contact\/$/);
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hello',
      message: 'I would like to contribute a GIS resource.',
    });
  });

  it('raises a readable error when the API is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down'))
    );

    await expect(
      submitContactMessage({
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Ping',
      })
    ).rejects.toThrow('Could not reach the server');
  });
});
