import { Component, Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { baseUrl } from '../../app.component';

interface Skill {
  id: number;
  title: string;
  parents: number[];
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-arbre',
  templateUrl: './arbre.component.html',
  styleUrls: ['./arbre.component.css'],
})
export class ArbreComponent implements OnInit {
  tasks: any[] = [];
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;
  dragOffsetX: number = 0;
  dragOffsetY: number = 0;
  data: any[] = [];
  idUser: number = 1;

  async ngOnInit() {
    await this.getArbre();
    this.setTask();
  }

  dependencies: any[] = [];

  setTask() {
    const center = this.showSetCenter();
    if (center) {
      // console.log(center);
      for (let i = 0; i < 4; i++) {
        for (let element of this.data[i].skills) {
          this.tasks.push({
            id: element.id,
            x: element.x + center.width / 2,
            y: element.y + center.height / 2,
            text: element.title,
          });
          for (let par of element.parents) {
            this.dependencies.push({
              from: par,
              to: element.id,
            });
          }
        }
      }
      console.log(this.tasks);
    }
  }

  showSetCenter() {
    const rect = document
      .querySelector('.pert-container')
      ?.getBoundingClientRect();
    if (rect) {
      return rect;
    }
    return;
  }

  async getArbre() {
    try {
      const resp = await axios.get(`${baseUrl}/skill/user/${this.idUser}`);
      this.data = resp.data;
      console.log(this.data);
    } catch (error) {
      alert(error);
    }
  }

  getId() {
    return 1;
  }
}
