import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextService } from '../../Service/text.service';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
})
export class FeatureComponent {
  showText: boolean = false;
  @ViewChild('videoPlayer') videoPlayer: ElementRef | undefined;
  ngOnInit(): void {
    if (this.videoPlayer) this.videoPlayer.nativeElement.play(); // Démarre automatiquement la lecture
  }

  constructor(private sharedService: TextService) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }
}
