import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFullDetailComponent } from './payment-full-detail.component';

describe('PaymentFullDetailComponent', () => {
  let component: PaymentFullDetailComponent;
  let fixture: ComponentFixture<PaymentFullDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFullDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
