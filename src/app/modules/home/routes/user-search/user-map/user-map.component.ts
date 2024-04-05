import { Component, OnDestroy, OnInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { UserCoordinatesModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrl: './user-map.component.css',
})
export class UserMapComponent implements OnInit, OnDestroy {
  coordinates: UserCoordinatesModel = {
    latitude: '50.4504',
    longitude: '30.5245',
  };

  newUserSubscription = new Subscription();

  constructor (private readonly userService: UserService) {}

  ngOnInit () {
    this.newUserSubscription = this.userService.newUser.subscribe((user) => {
      const { location: { coordinates: { longitude, latitude } } } = user;
      this.layers = [
        marker([Number.parseFloat(latitude), Number.parseFloat(longitude)],
          { icon: icon({ iconUrl: user.picture, iconSize: [40, 40], iconAnchor: [16, 16]  }), alt: 'User icon' }),
      ];
      this.center = latLng(Number.parseFloat(latitude), Number.parseFloat(longitude));
    });
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: latLng(Number.parseFloat(this.coordinates.latitude), Number.parseFloat(this.coordinates.longitude)),
  };

  layers = [
    marker(
      [Number.parseFloat(this.coordinates.latitude), Number.parseFloat(this.coordinates.longitude)],
      { icon: icon({ iconUrl: 'assets/img/icon-user.png', iconSize: [40, 40] }), alt: 'User icon' }),
  ];

  center = latLng(Number.parseFloat(this.coordinates.longitude), Number.parseFloat(this.coordinates.latitude));

  ngOnDestroy () {
    this.newUserSubscription.unsubscribe();
  }
}
