import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular_login_form';
  loginForm: FormGroup;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
}
