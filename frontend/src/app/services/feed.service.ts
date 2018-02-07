import { Injectable } from '@angular/core';
import { Feed } from '../models/feed';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../app.state';
import { fetchFeed, removeFeed, updateArticle, updateFeed } from '../store/feeds.reducer';
import { Article } from '../models/article';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FeedService {
  private feeds: Array<Feed>;
  private readonly FETCH_API = 'api/feed?feedUrl=';
  private readonly YOUTUBE_FEEDS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<AppState>,
              private notificationService: NotificationService) {
    this.subscribeOnFeedsChanges();
  }

  addFeed(url: string): void {
    if (this.isCorrectUrl(url) && this.isNewUrl(url)) {
      this.fetchFeedContent(url);
    }
  }

  removeFeed(feed: Feed) {
    this.ngRedux.dispatch(removeFeed(feed));
    this.notificationService.alert('Feed has been removed!')
  }

  updateFeed(feedToUpdate: Feed) {
    this.http.get<Feed>(this.getFetchApiUrl(feedToUpdate.info.link))
      .subscribe(
        feed => {
          this.ngRedux.dispatch(updateFeed(new Feed(feed)));
          this.notificationService.alert('Feed has been updated!')
        },
        error => this.notificationService.error(this.getErrorMessage(error))
      )
  }

  updateFeeds() {
    let errors = [];
    Observable.from(this.feeds)
      .mergeMap(feed => this.http.get<Feed>(this.getFetchApiUrl(feed.info.link)))
      .subscribe(
        feed => this.ngRedux.dispatch(updateFeed(new Feed(feed))),
        error => errors.push(this.getErrorMessage(error)),
        () => {
          errors.length > 0 ?
            this.notificationService.error(errors.toString()) :
            this.notificationService.alert('All feeds have been updated!')
        }
      )
  }

  getFeedById(id: string): Feed {
    return this.feeds.find(feed => feed.info.id === id);
  }

  getArticleById(feed: Feed, id: string): Article {
    return feed.articles.find(article => article.guid === id);
  }

  updateArticle(article: Article): void {
    this.ngRedux.dispatch(updateArticle(article))
  }

  private fetchFeedContent(url: string): void {
    this.http.get<Feed>(this.getFetchApiUrl(url))
      .subscribe(
        feed => this.ngRedux.dispatch(fetchFeed(new Feed(feed))),
        error => this.notificationService.error(this.getErrorMessage(error))
      );
  }

  private getFetchApiUrl(url: string): string {
    return this.FETCH_API + this.YOUTUBE_FEEDS_URL + this.getFeedIdByUrl(url);
  }

  private getFeedIdByUrl(url: string) {
    let chunks = url.split('/');
    return chunks[chunks.length - 1];
  }

  private isCorrectUrl(url: string): boolean {
    return !!url.match(/^https:\/\/www.youtube.com\/channel\//);
  }

  private isNewUrl(url: string): boolean {
    return !this.feeds.some((feed) => feed.info.link === url);
  }

  private getErrorMessage(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      return error.error;
    }
  };

  private subscribeOnFeedsChanges(): void {
    this.ngRedux.select<Array<Feed>>('feeds').subscribe(feeds => this.feeds = feeds);
  }
}
