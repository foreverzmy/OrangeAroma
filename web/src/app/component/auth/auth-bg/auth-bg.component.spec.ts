import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBgComponent } from './auth-bg.component';

describe('AuthBgComponent', () => {
  let component: AuthBgComponent;
  let fixture: ComponentFixture<AuthBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
