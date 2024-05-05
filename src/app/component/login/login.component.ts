import { Component } from '@angular/core';
import { GenericService } from '../../Service/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private apiService: GenericService, private router: Router) {}

  formData: any = {
    login: 'admin@gmail.com',
    password: 'password',
  };

  async login() {
    const result = await this.apiService.post('auth/login', this.formData);
    localStorage.setItem('userInfo', JSON.stringify(result.data));
    this.router.navigateByUrl('/home/started');
  }
}
