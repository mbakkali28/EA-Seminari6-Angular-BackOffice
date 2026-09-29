import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barradenavegacion } from './barradenavegacion';

describe('Barradenavegacion', () => {
  let component: Barradenavegacion;
  let fixture: ComponentFixture<Barradenavegacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barradenavegacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Barradenavegacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
