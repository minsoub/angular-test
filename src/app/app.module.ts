/* 모듈을 로드하면 AppModule에서 이 심볼에 접근할 수 있습니다. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { ItemDirective } from './item.directive';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroDetailComponent,
    HeroesComponent,
    ItemDirective,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
  ],
  imports: [  /* 이 NgModule에서 사용하는 외부 모듈은 여기에 등록합니다. */
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    // HttpClientInMemoryWebApiModule 모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내냅니다.
    // 실제 서버가 준비되면 이 부분을 제거하면 됩니다.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
