import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LoaderService } from 'src/app/common/loader/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LoginBoxedComponent implements OnInit {
  loginForm: FormGroup;
  loginError = null;

  constructor(
    private authService: SocialAuthService,
    private httpService: HttpClient,
    private fb: FormBuilder,
    private socialService: SocialAuthService,
    private router: Router,
    private loaderService: LoaderService
  ) { 
    this.loginForm = this.fb.group({
      email: ['test@daffodilsw.com', [Validators.required, Validators.email]],
      password: ['hrhk@1234', Validators.required]
    });

    // this.socialService.authState.subscribe((user) => {
    //   console.log("test=========",user);
    // });
  }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.loginError = null;
    this.loaderService.showLoader();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res:any)=> {
      if(res && res.email) {
        this.setLoginDataToStorage(res);
        this.gotoDashboard();
      }
      this.loaderService.hideLoader();
    },(err)=> {
      console.log(err);
      this.loaderService.hideLoader();
    });
  }

  onLogin() {
    this.loginError = null;
    let headers = new HttpHeaders();
    headers = headers.set("apiKey", "3BEA8ADD2B31B9587D46E3F7DF7B6");
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set('Accept', 'application/json');
    
    this.loaderService.showLoader();
    this.httpService.post(`${environment.baseUrl}/auth/login`, {
      ...this.loginForm.value
    }, {
      headers: headers
    }).subscribe((res:any)=> {
      if(res.data && res.data.email) {
        this.setLoginDataToStorage(res.data);
        this.gotoDashboard();
      }
      this.loaderService.hideLoader();
    }, (err)=> {
      console.log(err);
      this.loginError = err.error.detail;
      this.loaderService.hideLoader();
    })
  }

  setLoginDataToStorage(data) {
    localStorage.setItem(environment.loginDataKey, btoa(JSON.stringify(data)));
  }

  gotoDashboard() {
    this.router.navigateByUrl("/");
  }
}
