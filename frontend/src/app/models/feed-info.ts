export class FeedInfo {
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
  id: string;
  constructor(feedInfo) {
    this.id = feedInfo['yt:channelid']['#'];
    this.title = feedInfo.title;
    this.link = feedInfo.link;
    this.author = feedInfo.author;
    this.description = feedInfo.description;
    this.image = feedInfo.image;
  }
}
