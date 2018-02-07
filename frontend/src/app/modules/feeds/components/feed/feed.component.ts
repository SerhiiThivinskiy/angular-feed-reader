import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Feed } from '../../../../models/feed';
import { AppState } from '../../../../app.state';
import { NgRedux } from '@angular-redux/store';
import { Article } from '../../../../models/article';
import { FeedService } from '../../../../services/feed.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  feeds: Array<Feed>;
  feed: Feed;
  private alive = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private feedService: FeedService,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.subscribeOnFeedsChanges();
    this.subscribeOnRouteEvents()
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateFeed() {
    this.feedService.updateFeed(this.feed);
  }

  removeFeed() {
    if (confirm('Are you sure want to remove this channel?')) {
      this.feedService.removeFeed(this.feed);
      this.router.navigate(['/']);
    }
  }

  showArticle(article: Article) {
    this.router.navigate(['message', article.guid], { relativeTo: this.route });
  }

  private subscribeOnRouteEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.route.data.subscribe((data: { feed: Feed }) => this.feed = data.feed);
  }

  private subscribeOnFeedsChanges(): Subscription {
    return this.ngRedux.select<Array<Feed>>('feeds')
      .pipe(takeWhile(() => this.alive))
      .subscribe(feeds => this.feeds = feeds);
  }
}
