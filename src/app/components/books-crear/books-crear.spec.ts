import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCrear } from './books-crear';

describe('BooksCrear', () => {
  let component: BooksCrear;
  let fixture: ComponentFixture<BooksCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksCrear],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
