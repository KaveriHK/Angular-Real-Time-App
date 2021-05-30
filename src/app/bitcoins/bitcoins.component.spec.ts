import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinsComponent } from './bitcoins.component';

describe('BitcoinsComponent', () => {
  let component: BitcoinsComponent;
  let fixture: ComponentFixture<BitcoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
