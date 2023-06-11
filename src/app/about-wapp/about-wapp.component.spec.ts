import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWappComponent } from './about-wapp.component';

describe('AboutWappComponent', () => {
  let component: AboutWappComponent;
  let fixture: ComponentFixture<AboutWappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutWappComponent]
    });
    fixture = TestBed.createComponent(AboutWappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
