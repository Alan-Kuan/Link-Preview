import { cheerio } from 'https://deno.land/x/cheerio@1.0.4/mod.ts'

type Info = string | null;

class PageInfo {
  private $;

  private domain: Info = null;
  private title: Info = null;
  private desc: Info = null;
  private img_url: Info = null;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  getDomain(): string | null {
    if (this.domain != null) {
      return this.domain;
    }

    let url_selector = this.$('meta[property="og:url"]');
    if (url_selector.length > 0) {
      let canonical_url: string = url_selector.prop('content');
      return (this.domain = canonical_url.split('/')[2]);
    }

    url_selector = this.$('link[rel="canonical"]');
    if (url_selector.length > 0) {
      let canonical_url: string = url_selector.prop('href');
      return (this.domain = canonical_url.split('/')[2])
    }

    return null;
  }

  getTitle(): string | null {
    if (this.title != null) {
      return this.title;
    }

    let title_selector = this.$('meta[property="og:title"]');
    if (title_selector.length > 0) {
      return (this.title = title_selector.prop('content'));
    }

    title_selector = this.$('title');
    if (title_selector.length > 0) {
      return (this.title = title_selector.text());
    }

    title_selector = this.$('h1');
    if (title_selector.length > 0) {
      return (this.title = title_selector.text());
    }

    title_selector = this.$('h2');
    if (title_selector.length > 0) {
      return (this.title = title_selector.text());
    }

    return null;
  }

  getDesc(): string | null {
    if (this.desc != null) {
      return this.desc;
    }

    let desc_selector = this.$('meta[property="og:description"]');
    if (desc_selector.length > 0) {
      return (this.desc = desc_selector.prop('content'));
    }

    desc_selector = this.$('p');
    if (desc_selector.length > 0) {
      return (this.desc = desc_selector.text());
    }

    return null;
  }

  getImageUrl(): string | null {
    if (this.img_url != null) {
      return this.img_url;
    }

    let img_selector = this.$('meta[property="og:image"]');
    if (img_selector.length > 0) {
      return (this.img_url = img_selector.prop('content'));
    }

    img_selector = this.$('link[rel="image_src"]');
    if (img_selector.length > 0) {
      return (this.img_url = img_selector.prop('href'));
    }

    img_selector = this.$('img');
    if (img_selector.length > 0) {
      return (this.img_url = img_selector.prop('src'));
    }

    return null;
  }
}

export { PageInfo };
