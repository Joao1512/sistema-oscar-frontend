import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapatosFormComponent } from './sapatos-form.component';

describe('SapatosFormComponent', () => {
  let component: SapatosFormComponent;
  let fixture: ComponentFixture<SapatosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapatosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapatosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
