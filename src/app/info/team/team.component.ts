import { Component } from '@angular/core';
import { TextService } from '../../Service/text.service';
import { fadeInAnimation } from '../../start/start.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  animations: [fadeInAnimation],
})
export class TeamComponent {
  showText: boolean = false;

  constructor(private sharedService: TextService) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }
}
