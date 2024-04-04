import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Subscription } from 'rxjs';
import { UserDetailsModel } from '../../models/user-details.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  userDetailsList: UserDetailsModel[];
  weatherListSubscription: Subscription;

  constructor (private readonly localstorageService: LocalstorageService) {}

  ngOnInit (): void {
    this.userDetailsList = this.localstorageService.getAll();

    this.weatherListSubscription = this.localstorageService.weatherDataUpdate.subscribe((userDetailList) => {
      this.userDetailsList = userDetailList;
    });
  }

  ngOnDestroy () {
    this.weatherListSubscription.unsubscribe();
  }
}
