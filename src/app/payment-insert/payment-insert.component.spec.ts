import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInsertComponent } from './payment-insert.component';

describe('PaymentInsertComponent', () => {
  let component: PaymentInsertComponent;
  let fixture: ComponentFixture<PaymentInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
