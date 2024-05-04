import { Component } from '@angular/core';
import {GenericService} from "../../Service/generic.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private apiService: GenericService) {
  }

  formData:any={
    login: "admin@gmail.com",
    password: "password"
  };

  async login () {
    const result = await this.apiService.post("auth/login", this.formData);
    console.log(result);
  }
}
