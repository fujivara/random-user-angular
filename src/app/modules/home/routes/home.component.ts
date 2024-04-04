import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  isListOpened: boolean;
  newUserDetailsListSubscription = new Subscription();

  constructor (
    private readonly router: Router,
    private readonly localstorageService: LocalstorageService,
  ) {}

  ngOnInit (): void {
    this.isListOpened = this.router.url !== '/home/user';
    this.newUserDetailsListSubscription = this.localstorageService.weatherDataUpdate.subscribe();
  }

  ngOnDestroy () {
    this.newUserDetailsListSubscription.unsubscribe();
  }

  onSwitch (): void {
    if (this.isListOpened) {
      this.router.navigate(['/home/user']);
      this.isListOpened = false;
    } else {
      this.router.navigate(['/home/list']);
      this.isListOpened = true;
    }
  }
}
