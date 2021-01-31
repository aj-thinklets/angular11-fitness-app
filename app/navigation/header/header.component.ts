import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() navMenuClose = new EventEmitter
  isAuth = false;
  authSubscription: Subscription

  constructor(
  private authService: AuthService  
  ) { }

  ngOnInit() {
    this.authSubscription= this.authService.authChange.subscribe(authState => {
      this.isAuth = authState;
    })
  }

  onClose() {
    this.navMenuClose.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

}
