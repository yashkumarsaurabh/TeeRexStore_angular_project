import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppService } from './app.service';
import { App2 } from './app2.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular_login_form';
  loginForm: FormGroup;
  data = {username: "yash", email: 'abc@gmail.com', password: 123};

  username = new FormControl(this.data.username, Validators.required);
  password = new FormControl(this.data.password, Validators.required);
  email = new FormControl(this.data.email, Validators.required);

  constructor(private service: AppService) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email,
    })

    let obs = new Observable(observer => {
      observer.next(of([1,2,3,4]));
      observer.next(of([1,2,3,4,5]));
    });
    obs.subscribe((data:any) => {
      data.subscribe((data2: any) => {
        console.log(data2);
      })
    }, error => console.log(error))
    obs.subscribe((data:any) => {
      data.subscribe((data2: any) => {
        console.log(data2);
      })
    })
    
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.updateData();
    this.loginForm.reset();
  }

  updateData() {
    this.service.data.next("abc");
  }
}
