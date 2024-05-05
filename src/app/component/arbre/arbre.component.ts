import { AfterViewInit, Component } from '@angular/core';
import axios from 'axios';
import { baseUrl } from '../../app.component';
import { fadeInAnimation } from '../../start/start.component';
import { TextService } from '../../Service/text.service';
import { MouseService } from '../../Service/mouse.service';
import { GenericService } from '../../Service/generic.service';

@Component({
  selector: 'app-arbre',
  templateUrl: './arbre.component.html',
  styleUrls: ['./arbre.component.css'],
  animations: [fadeInAnimation],
})
export class ArbreComponent implements AfterViewInit {
  showText: boolean = false;

  tasks: any[] = [];
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;
  dragOffsetX: number = 0;
  dragOffsetY: number = 0;
  data: any[] = [];
  idUser: number = 1;
  showModal: boolean = false;
  selected: any = {};


  enter() {
    this.mouseService.enter();
  }

  exit() {
    this.mouseService.exit();
  }

  constructor(
    private sharedService: TextService,
    private mouseService: MouseService,
    private genericService: GenericService
  ) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }

  async ngAfterViewInit() {
    setTimeout(async () => {
      await this.getArbre();
      this.setTask();
    }, 100);
  }

  dependencies: any[] = [];

  setTask() {
    const center = this.showSetCenter();
    if (center) {
      for (let i = 0; i < 4; i++) {
        for (let element of this.data[i].skills) {
          this.tasks[element.id - 1] = {
            id: element.id,
            x: element.x - 30 + center.width / 2,
            y: element.y - 30 + center.height / 2,
            color: element.color,
            text: element.title,
            description: element.description,
            file: this.changeFileName(element.title),
            blocked: element.blocked,
            unblockable: element.unblockable,
          };
          for (let par of element.parents) {
            this.dependencies.push({
              from: par - 1,
              to: element.id - 1,
            });
          }
        }
      }
    }
  }

  showSetCenter() {
    const rect = document.querySelector('.content')?.getBoundingClientRect();
    if (rect) {
      return rect;
    }
    return;
  }

  async getArbre() {
    try {
      const resp = await axios.get(`${baseUrl}/skill/user/${this.idUser}`);
      this.data = resp.data;
    } catch (error) {
      alert(error);
    }
  }

  getId() {
    return 1;
  }

  changeFileName(text: string): string {
    let fileName = text.toLowerCase();

    fileName = fileName.replace(/[^\w\s]/g, '_');
    fileName = fileName.replace(/\s+/g, '_');

    return fileName;
  }

  getProposition(select: any) {
    this.showModal = true;
    this.selected = select;
  }

  getLineStyle(line: any): any {
    if (line) {
      const deltaX = this.tasks[line.to].x - this.tasks[line.from].x;
      const deltaY = this.tasks[line.to].y - this.tasks[line.from].y;
      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      return {
        width: length + 'px',
        transform: 'rotate(' + angle + 'deg)',
        position: 'absolute',
        top: this.tasks[line.from].y + 30 + 'px',
        left: this.tasks[line.from].x + 30 + 'px',
        transformOrigin: '0 0',
        background: `linear-gradient(to right, ${
          this.tasks[line.from].color
        }, ${this.tasks[line.to].color})`,
        border:
          this.tasks[line.to].blocked || this.tasks[line.from].blocked
            ? '1.4px dashed gray'
            : '',
        borderDashed:
          this.tasks[line.to].blocked || this.tasks[line.from].blocked
            ? '10px'
            : '',
      };
    }
    return {
      width: '0px',
      transform: 'rotate(' + 0 + 'deg)',
      position: 'absolute',
      top: '0px',
      left: '0px',
      transformOrigin: '0 0',
    };
  }

  async unlockSkill (skillId: number) {
    console.log(this.selected);
    
    const userStr = localStorage.getItem("userInfo");
    if (userStr) {
      const user = JSON.parse(userStr);
      const userId = user.id;
      const result = await this.genericService.post("skill/unlock", {
        idUtilisateur: userId,
        idCompetence: skillId
      });
      console.log(result);

    }
  }
}
