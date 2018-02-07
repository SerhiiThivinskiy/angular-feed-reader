import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { FeedService } from '../../../services/feed.service';
import { Feed } from '../../../models/feed';
import { Article } from '../../../models/article';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private feedService: FeedService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Article {
    let feed: Feed = this.feedService.getFeedById(route.paramMap.get('id'));

    if (feed) {
      let foundArticle: Article = this.feedService.getArticleById(feed, route.paramMap.get('guid'));

      if (foundArticle) {
        return foundArticle;
      } else {
        this.router.navigate(['channel', feed.info.id]);
      }

    } else {
      this.router.navigate(['/']);
    }

  }
}
