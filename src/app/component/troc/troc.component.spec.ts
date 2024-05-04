import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocComponent } from './troc.component';

describe('TrocComponent', () => {
  let component: TrocComponent;
  let fixture: ComponentFixture<TrocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
