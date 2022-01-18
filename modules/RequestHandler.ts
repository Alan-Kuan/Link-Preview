import type { PageInfo } from './PageInfo/index.ts'

interface PageInfoResponse {
  error: 0 | 1,
  error_message?: string,
  domain?: string,
  title?: string,
  description?: string,
  image_url?: string,
}

function makeResponse(data: PageInfoResponse, status: number) {
  return new Response(
    JSON.stringify(data, null, 2),
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf8',
      },
    }
  );
}

export function rejectWith(error_message: string, status: number) {
  return makeResponse({
    error: 1,
    error_message
  }, status);
}

export function responseWith(page_info: PageInfo) {
  return makeResponse({
    error: 0,
    ...page_info
  }, 200);
}
