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
    this.setTask();
    await this.getArbre();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.dragOffsetX = event.clientX - this.dragStartX;
      this.dragOffsetY = event.clientY - this.dragStartY;
      this.updateTasksPosition();
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  updateTasksPosition() {
    this.tasks.forEach((task) => {
      if (task.x && task.y) {
        task.x += this.dragOffsetX;
        task.y += this.dragOffsetY;
      }
    });
    this.dragStartX += this.dragOffsetX;
    this.dragStartY += this.dragOffsetY;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  dependencies = [
    { from: 1, to: 1 },
    // { from: 4, to: 5 },
    // { from: 1, to: 5 },
    // { from: 2, to: 3 },
    // { from: 1, to: 4 },
  ];

  setTask() {
    const center = this.showSetCenter();
    if (center) {
      // console.log(center);

      this.tasks = [
        {
          id: 1,
          x: center.width + center.left - center.right / 2,
          y: center.height + center.top - +center.bottom / 2 + 200,
          text: 'Eau',
        },
        {
          id: 2,
          x: center.width + center.left - center.right / 2 + 200,
          y: center.height + center.top - +center.bottom / 2,
          text: 'Feu',
        },
        {
          id: 3,
          x: center.width + center.left - center.right / 2 - 200,
          y: center.height + center.top - +center.bottom / 2,
          text: 'Air',
        },
        {
          id: 4,
          x: center.width + center.left - center.right / 2,
          y: center.height + center.top - +center.bottom / 2 - 200,
          text: 'Terre',
        },
        // {
        //   id: 5,
        //   x: center.width / 2,
        //   y: center.height / 2,
        // },
      ];
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

  buildTree() {}
}
