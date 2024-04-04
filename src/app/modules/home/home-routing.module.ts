import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSearchComponent } from './routes/user/user-search.component';
import { UserListComponent } from './routes/user-list/user-list.component';
import { HomeComponent } from './routes/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home/user' },
  { path: 'home', pathMatch: 'full', redirectTo: 'home/user' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'user', component: UserSearchComponent },
    { path: 'list', component: UserListComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
