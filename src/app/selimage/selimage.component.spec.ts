import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelimageComponent } from './selimage.component';

describe('SelimageComponent', () => {
  let component: SelimageComponent;
  let fixture: ComponentFixture<SelimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
