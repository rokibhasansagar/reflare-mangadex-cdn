import useReflare from 'reflare';

const handleRequest = async (
  request: Request,
): Promise<Response> => {
  const reflare = await useReflare();

  reflare.push({
    path: '/*',
    upstream: {
      domain: 'mangadex.org',
      protocol: 'https',
      port: 443,
      weight: 1,
      onRequest: (request: Request, url: string): Request => {
        // Modifies the URL of the request
        return new Request(url.replace('api.mangadex.org', 'mangadexapi.phantomzone.workers.dev'), request);
      },
    },
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  return reflare.handle(request);
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
