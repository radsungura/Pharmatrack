import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediSearchComponent } from './medi-search.component';

describe('MediSearchComponent', () => {
  let component: MediSearchComponent;
  let fixture: ComponentFixture<MediSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediSearchComponent]
    });
    fixture = TestBed.createComponent(MediSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
