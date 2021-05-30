import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWinDataComponent } from './co-win-data.component';

describe('CoWinDataComponent', () => {
  let component: CoWinDataComponent;
  let fixture: ComponentFixture<CoWinDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoWinDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWinDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
