export class Article {
  title: string;
  guid: string;
  pubDate: Date;
  author: string;
  description: string;
  visited: boolean;
  image: any;
  videoHeight: number;
  videoWidth: number;

  constructor(article) {
    this.title = article.title;
    this.pubDate = article.pubDate;
    this.author = article.author;
    this.image = article.image;
    this.visited = false;
    this.guid = article['yt:videoid']['#'];
    this.description = article['media:group']['media:description']['#'];
    this.videoHeight = article['media:group']['media:content']['@'].height;
    this.videoWidth = article['media:group']['media:content']['@'].width;
  }
}
