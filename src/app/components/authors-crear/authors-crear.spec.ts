import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsCrear } from './authors-crear';

describe('AuthorsCrear', () => {
  let component: AuthorsCrear;
  let fixture: ComponentFixture<AuthorsCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsCrear],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
