import { http, HttpResponse } from 'msw';

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.get('/api/diary/tags', async () => {
    await delay(2000);
    return HttpResponse.json(['play', 'nec', 'household']);
  }),
];
