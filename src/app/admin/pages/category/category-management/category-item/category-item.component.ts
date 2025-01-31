import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { initModals } from 'flowbite';
import { Category } from 'src/app/models/interface/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() category!: Category;
  @Output() edit = new EventEmitter<any>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    
    initModals();
  }

  onEdit(): void {
    this.edit.emit(this.category);
  }
  
  onDeleteCategory(): void {
    this.categoryService.removeCategory(this.category.id).subscribe();
  }
}
