import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { AppState } from './app.state';
import { configureStore } from './store/app.store';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { FeedService } from './services/feed.service';
import { FeedsModule } from './modules/feeds/feeds.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    FeedsModule,
    AppRoutingModule,
  ],
  providers: [
    FeedService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    const { store } = configureStore();

    ngRedux.provideStore(store);
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
