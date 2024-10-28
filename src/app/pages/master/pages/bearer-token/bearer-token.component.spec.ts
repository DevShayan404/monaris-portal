import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BearerTokenComponent } from './bearer-token.component';

describe('BearerTokenComponent', () => {
  let component: BearerTokenComponent;
  let fixture: ComponentFixture<BearerTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BearerTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BearerTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
