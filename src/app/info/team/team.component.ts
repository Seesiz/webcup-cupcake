import { Component } from '@angular/core';
import { TextService } from '../../Service/text.service';
import { fadeInAnimation } from '../../start/start.component';
import { MouseService } from '../../Service/mouse.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  animations: [fadeInAnimation],
})
export class TeamComponent {
  ngOnInit(): void {}

  enter() {
    this.mouseService.enter();
  }

  exit() {
    this.mouseService.exit();
  }
  showText: boolean = false;

  constructor(
    private sharedService: TextService,
    private mouseService: MouseService
  ) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }
}
