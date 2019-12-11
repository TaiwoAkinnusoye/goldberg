import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhappyComponent } from './viewhappy.component';

describe('ViewhappyComponent', () => {
  let component: ViewhappyComponent;
  let fixture: ComponentFixture<ViewhappyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhappyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhappyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
