import { Component } from '@angular/core';
import {GenericService} from "../../Service/generic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  constructor(private apiService: GenericService,
              private router: Router) {
  }

  formData:any={
    nom: "",
    prenom: "",
    email: "",
    password: ""
  };

  async signIn () {
    const result = await this.apiService.post("auth/register", this.formData);
    localStorage.setItem("userInfo", JSON.stringify(result.data));
    this.router.navigateByUrl("/home/started");
  }
}
