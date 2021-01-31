import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sideNavCloseClicked = new EventEmitter
  isAuth = false;
  authSubscription: Subscription

  constructor(
    private authService: AuthService
  ) { }

  onClose() {
    this.sideNavCloseClicked.emit();
  }

  onLogout() {
    this.sideNavCloseClicked.emit();
    this.authService.logout();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authState =>  this.isAuth = authState);
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }



}
