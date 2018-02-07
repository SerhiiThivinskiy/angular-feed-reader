import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { FeedService } from '../../../services/feed.service';
import { Feed } from '../../../models/feed';

@Injectable()
export class FeedResolver implements Resolve<Feed> {
  constructor(private feedService: FeedService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Feed {
    let id = route.paramMap.get('id');
    let feed: Feed = this.feedService.getFeedById(id);

    if (!feed) {
      this.router.navigate(['/']);
    }

    return feed;
  }
}
