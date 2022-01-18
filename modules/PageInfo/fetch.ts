import { PageInfoResolver } from './resolver.ts'
import { PageInfo } from './types.d.ts'

export async function fetchPageInfo(url: string): Promise<PageInfo> {
  const page_info = await fetch(url)
    .then(res => {
      return res.text();
    })
    .then(html => {
      const site_info = new PageInfoResolver(html);

      let domain = site_info.getDomain() ?? url.split('/')[2];
      let title = site_info.getTitle() ?? 'Unknown';
      let description = site_info.getDesc() ?? 'Empty';
      let image_url = site_info.getImageUrl() ?? 'Empty';

      if (image_url[0] == '/') {
        const protocol = url.split('/')[0];
        image_url = `${ protocol }//${ domain }${ image_url }`;
      }

      return { domain, title, description, image_url };
    })
    .catch(err => {
      console.error(err);
      return null;
    });
  return page_info;
}
