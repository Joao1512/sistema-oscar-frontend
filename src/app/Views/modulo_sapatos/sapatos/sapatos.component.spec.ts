import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapatosComponent } from './sapatos.component';

describe('SapatosComponent', () => {
  let component: SapatosComponent;
  let fixture: ComponentFixture<SapatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
