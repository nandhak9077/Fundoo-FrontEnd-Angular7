import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptytrashComponent } from './emptytrash.component';

describe('EmptytrashComponent', () => {
  let component: EmptytrashComponent;
  let fixture: ComponentFixture<EmptytrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptytrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptytrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
