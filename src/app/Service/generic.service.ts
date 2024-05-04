import { Injectable } from '@angular/core';
import {ErrorService} from "./error.service";
import axios from "axios";
import {baseUrl} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  error: any = {};
  constructor(private ErrorService: ErrorService) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
  }
  async get(path: string) {
    try {
      const response = await axios.get(`${baseUrl}/${path}`);
      return response.data;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }
  async post(path: string, data: any) {
    try {
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/${path}`,
        data: data,
      });
      return response.data;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }
  async delete(path: string, id: any) {
    try {
      const response = await axios.delete(`${baseUrl}/${path}/${id}`);
      return response.data;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }
  async put(path: string, data: any) {
    try {
      const response = await axios.put(`${baseUrl}/${path}`, data);
      return response.data;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }
}
