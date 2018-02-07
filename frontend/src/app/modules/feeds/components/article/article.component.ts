import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../../models/article';
import { FeedService } from '../../../../services/feed.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  article$: Observable<Article>;
  player: YT.Player;

  constructor(private route: ActivatedRoute,
              private feedService: FeedService) {
  }

  ngOnInit() {
    this.article$ = this.route.data.pipe(map((data: { article: Article }) => data.article));
    this.loadVideo();
  }

  savePlayer(player) {
    this.player = player;
    this.player.loadVideoById(this.article.guid);
  }

  private loadVideo(): void {
    this.article$.subscribe(article => {
      this.article = article;
      this.player && this.player.loadVideoById(this.article.guid);
      if (!article.visited) {
        setTimeout(() => {
          this.article.visited = true;
          this.feedService.updateArticle(this.article);
        }, 0);
      }
    });
  }
}
