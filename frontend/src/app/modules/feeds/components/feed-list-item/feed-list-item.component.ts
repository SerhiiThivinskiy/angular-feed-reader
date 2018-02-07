import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Feed } from '../../../../models/feed';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../../app.state';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-feed-list-item',
  templateUrl: './feed-list-item.component.html',
  styleUrls: ['./feed-list-item.component.css']
})
export class FeedListItemComponent implements OnInit, OnDestroy {
  @Input()
  feed: Feed;

  isActive: boolean;
  newArticles = 0;
  private alive = true;

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.subscribeOnFeedsChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  toggleArticlesDisplay() {
    this.isActive = !this.isActive;
  }

  private subscribeOnFeedsChanges(): Subscription {
    return this.ngRedux.select('feeds')
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.newArticles = this.feed.articles.filter(article => !article.visited).length);
  }
}
