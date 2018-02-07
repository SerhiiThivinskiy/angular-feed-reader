import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedService } from '../../../../services/feed.service';
import { Feed } from '../../../../models/feed';
import { AppState } from '../../../../app.state';
import { NgRedux } from '@angular-redux/store';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css'],
})
export class FeedListComponent implements OnInit, OnDestroy {
  private alive = true;
  feeds: Array<Feed>;

  constructor(private feedService: FeedService,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.subscribeOnFeedsChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onSelectFeed(feed: Feed) {
    let feedIndex = this.feeds.indexOf(feed);

    if (feedIndex > 0) {
      this.feeds.splice(feedIndex, 1);
      this.feeds.unshift(feed);
    }
  }

  private subscribeOnFeedsChanges(): void {
    this.ngRedux.select<Array<Feed>>('feeds')
      .pipe(takeWhile(() => this.alive))
      .subscribe(feeds => this.feeds = feeds);
  }
}
