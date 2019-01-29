import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './components/app.component';
import { BlogsModule } from './pages/blogs/blogs.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RestaurantCardComponent } from './pages/home/restaurant-card/restaurant-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    RestaurantCardComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BlogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }