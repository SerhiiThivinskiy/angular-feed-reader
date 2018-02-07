import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { AppState } from '../../app.state';
import { NgRedux } from '@angular-redux/store';
import { Feed } from '../../models/feed';
import { Subscription } from 'rxjs/Subscription';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isFeedsPresent: boolean;
  private alive = true;

  constructor(private feedService: FeedService,
              private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.subscribeOnFeedsChanges();
  }

  addFeed(url: string) {
    this.feedService.addFeed(url.slice());
  }

  updateFeeds() {
    this.feedService.updateFeeds();
  }

  private subscribeOnFeedsChanges(): Subscription {
    return this.ngRedux.select<Array<Feed>>('feeds')
      .pipe(takeWhile(() => this.alive))
      .subscribe(feeds => this.isFeedsPresent = feeds.length > 0);
  }
}
