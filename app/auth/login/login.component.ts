import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  maxDate;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //Minumum 18 Year 
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
