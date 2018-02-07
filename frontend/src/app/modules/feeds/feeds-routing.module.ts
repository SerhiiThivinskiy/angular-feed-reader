import { RouterModule, Routes } from '@angular/router';
import { FeedResolver } from './services/feed-resolver.service';
import { ArticleResolver } from './services/article-resolver.service';
import { FeedComponent } from './components/feed/feed.component';
import { ArticleComponent } from './components/article/article.component';
import { NgModule } from '@angular/core';
import { FeedListComponent } from './components/feed-list/feed-list.component';

const feedsRoutes: Routes = [
  {
    path: '', component: FeedListComponent, children: [
      { path: 'channel/:id', component: FeedComponent, resolve: { feed: FeedResolver } },
      { path: 'channel/:id/message/:guid', component: ArticleComponent, resolve: { article: ArticleResolver } },
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(feedsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    FeedResolver,
    ArticleResolver
  ],
})
export class FeedsRoutingModule {
}
