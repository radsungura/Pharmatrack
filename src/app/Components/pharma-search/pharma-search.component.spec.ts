import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaSearchComponent } from './pharma-search.component';

describe('PharmaSearchComponent', () => {
  let component: PharmaSearchComponent;
  let fixture: ComponentFixture<PharmaSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaSearchComponent]
    });
    fixture = TestBed.createComponent(PharmaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
