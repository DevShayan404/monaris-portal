import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMerchantsComponent } from './view-merchants.component';

describe('ViewMerchantsComponent', () => {
  let component: ViewMerchantsComponent;
  let fixture: ComponentFixture<ViewMerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMerchantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
