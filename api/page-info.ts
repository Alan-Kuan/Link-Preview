import { fetchPageInfo } from '../modules/PageInfo/index.ts'
import { responseWith, rejectWith } from '../modules/RequestHandler.ts'

export default async ({ request }: Deno.RequestEvent) => {
  const url = new URL(request.url)
  const url_query = url.searchParams.get('url') ?? '';

  if (url_query.length === 0) {
    return rejectWith('no url provided', 400);
  }

  if (!url_query.startsWith('http://') && !url_query.startsWith('https://')) {
    return rejectWith('invalid webpage url', 400);
  }

  const page_info = await fetchPageInfo(url_query);

  if (page_info === null) {
    return rejectWith('internal error', 500);
  }

  return responseWith(page_info);
}
