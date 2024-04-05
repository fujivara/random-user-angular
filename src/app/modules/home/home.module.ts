import { NgModule } from '@angular/core';
import { UserListComponent } from './routes/user-list/user-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { UserSearchComponent } from './routes/user-search/user-search.component';
import { UserProfileComponent } from './routes/user-profile/user-profile.component';
import { WeatherComponent } from './routes/user-profile/weather/weather.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { HomeComponent } from './routes/home.component';
import { UserMapComponent } from './routes/user-search/user-map/user-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  imports: [HomeRoutingModule, NgForOf, NgIf, LeafletModule, NgClass],
  declarations: [
    UserSearchComponent,
    UserListComponent,
    UserProfileComponent,
    WeatherComponent,
    HomeComponent,
    UserMapComponent,
  ],
})
export class HomeModule {}
