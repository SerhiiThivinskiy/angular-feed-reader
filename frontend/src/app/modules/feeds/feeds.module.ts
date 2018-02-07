import { NgModule } from '@angular/core';

import { FeedListComponent } from './components/feed-list/feed-list.component';
import { ArticleComponent } from './components/article/article.component';
import { FeedComponent } from './components/feed/feed.component';
import { FeedListItemComponent } from './components/feed-list-item/feed-list-item.component';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { FeedsRoutingModule } from './feeds-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    YoutubePlayerModule,
    FeedsRoutingModule,
    SharedModule
  ],
  declarations: [
    FeedListComponent,
    FeedComponent,
    ArticleComponent,
    FeedListItemComponent
  ]
})
export class FeedsModule {}
