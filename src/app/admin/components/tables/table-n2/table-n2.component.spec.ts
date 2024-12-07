import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableN2Component } from './table-n2.component';

describe('TableN2Component', () => {
  let component: TableN2Component;
  let fixture: ComponentFixture<TableN2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableN2Component]
    });
    fixture = TestBed.createComponent(TableN2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
