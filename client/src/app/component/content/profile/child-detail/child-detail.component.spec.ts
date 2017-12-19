import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetailComponent } from './child-detail.component';

describe('ChildDetailComponent', () => {
  let component: ChildDetailComponent;
  let fixture: ComponentFixture<ChildDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
