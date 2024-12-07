import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableN1Component } from './table-n1.component';

describe('TableN1Component', () => {
  let component: TableN1Component;
  let fixture: ComponentFixture<TableN1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableN1Component]
    });
    fixture = TestBed.createComponent(TableN1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
