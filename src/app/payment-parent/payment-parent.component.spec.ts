import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentParentComponent } from './payment-parent.component';

describe('PaymentParentComponent', () => {
  let component: PaymentParentComponent;
  let fixture: ComponentFixture<PaymentParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
