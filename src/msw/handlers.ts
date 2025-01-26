import { http, HttpResponse } from 'msw';

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.get('/api/diary/tags', async () => {
    await delay(500);
    return HttpResponse.json(['play', 'nec', 'household']);
  }),

  http.get('/api/diary/stat/revenue', async () => {
    await delay(500);
    return HttpResponse.json({ income: 59272, outcome: 8167 });
  }),
];
