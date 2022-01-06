import { PageInfo } from './modules/PageInfo.ts'

const args = Deno.args;

if (args.length != 1) {
  console.error('Usage: deno run main.ts <webpage url>');
  Deno.exit(1);
}

const url = args[0];

if (!url.startsWith('http://') && !url.startsWith('https://')) {
  console.error('Error: invalid webpage url');
  Deno.exit(1);
}

fetch(url)
  .then(res => {
    return res.text();
  })
  .then(html => {
    const site_info = new PageInfo(html);

    let domain = site_info.getDomain() ?? url.split('/')[2];
    let title = site_info.getTitle() ?? 'Unknown';
    let desc = site_info.getDesc() ?? 'Empty';
    let img_url = site_info.getImageUrl() ?? 'Empty';

    if (img_url[0] == '/') {
      const proto = url.split('/')[0];
      img_url = `${ proto }//${ domain }${ img_url }`;
    }

    console.log(`Domain: ${ domain }`)
    console.log(`Title: ${ title }`);
    console.log(`Description: ${ desc }`);
    console.log(`Image: ${ img_url }`);
  })
  .catch(err => {
    console.error(err);
  });
