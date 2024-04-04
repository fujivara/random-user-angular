import { Component, Input } from '@angular/core';
import { UserDetailsModel } from '../../models/user-details.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  @Input()
    userDetails: UserDetailsModel;
}
