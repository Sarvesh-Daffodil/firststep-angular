import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(
    public globals: ThemeOptions,
    private router: Router
    ) {
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem(environment.loginDataKey);
    this.gotoLogin();
  }

  gotoLogin() {
    this.router.navigateByUrl('auth/login')
  }

}
