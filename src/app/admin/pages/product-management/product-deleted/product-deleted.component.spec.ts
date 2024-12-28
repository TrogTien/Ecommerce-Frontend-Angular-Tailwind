import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeletedComponent } from './product-deleted.component';

describe('ProductDeletedComponent', () => {
  let component: ProductDeletedComponent;
  let fixture: ComponentFixture<ProductDeletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDeletedComponent]
    });
    fixture = TestBed.createComponent(ProductDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
