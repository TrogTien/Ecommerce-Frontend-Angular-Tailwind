import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductDeletedComponent } from './item-product-deleted.component';

describe('ItemProductDeletedComponent', () => {
  let component: ItemProductDeletedComponent;
  let fixture: ComponentFixture<ItemProductDeletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemProductDeletedComponent]
    });
    fixture = TestBed.createComponent(ItemProductDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
