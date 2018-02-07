import { FeedInfo } from './feed-info';
import { Article } from './article';

export class Feed {
  info: FeedInfo;
  articles: Array<Article> = [];
  constructor(feed) {
    this.info = new FeedInfo(feed.info);
    feed.articles.forEach(article => this.articles.push(new Article(article)));
  }
}
