import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Feed } from '../../../../models/feed';
import { FeedService } from '../../../../services/feed.service';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../../../app.state';
import { Article } from '../../../../models/article';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {
  private alive = true;

  feeds: Array<Feed>;
  selectedFeed: Feed;
  selectedArticle: Article;
  authors: Set<string> = new Set<string>();

  chartLabels: Array<string> = [];
  chartData: Array<number> = [];

  constructor(private feedService: FeedService,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.subscribeOnFeedsChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  collectAuthors() {
    this.selectedFeed.articles.forEach(article => this.authors.add(article.author));
  }

  countCharacters(): void {
    let charactersFrequency: Map<string, number> = new Map<string, number>();

    let characters: Array<string> = this.selectedArticle.description
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .split('');

    characters.forEach(character => {
      const count = charactersFrequency.get(character);
      charactersFrequency.set(character, count ? count + 1 : 1);
    });

    this.chartLabels = Array.from(charactersFrequency.keys());
    this.chartData = Array.from(charactersFrequency.values());
  }


  private subscribeOnFeedsChanges(): Subscription {
    return this.ngRedux.select<Array<Feed>>('feeds')
      .pipe(takeWhile(() => this.alive))
      .subscribe(feeds => this.feeds = feeds);
  }
}
