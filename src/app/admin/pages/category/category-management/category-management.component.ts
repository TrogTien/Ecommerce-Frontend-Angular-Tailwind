import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { initModals, Modal } from 'flowbite';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('btnCloseEdit') btnCloseEditRef!: ElementRef;

  private addModal!: Modal;


  categories$!: Observable<Category[]>;

  nameCategory = new FormControl('', [Validators.required]);

  nameUpdateCategory = new FormControl('', [Validators.required]);
  categoryIdEdit = 0;

  constructor(
      private categoryService: CategoryService
  ) {}
  
 

  ngOnInit(): void {
    this.categories$ = this.categoryService.category$;
    this.categoryService.getAllCategories().subscribe();

    initModals();
  } 

  ngAfterViewInit(): void {
    const addModalElement: HTMLElement = this.addModalRef.nativeElement;

    this.addModal = new Modal(addModalElement);

  }

  setEditValue(category: Category): void {
    this.nameUpdateCategory.setValue(category.name);
    this.categoryIdEdit = category.id;
  }


  onSubmit(): void {
    this.nameCategory.markAsTouched();
    if (this.nameCategory.valid) {

      this.categoryService.addCategory(
        { name: this.nameCategory.value }
      ).subscribe(() => {
        console.log("Add category success!");

        this.addModal.hide();
        this.nameCategory.reset();
      })

    }
  }

  onUpdate(): void {
    this.nameUpdateCategory.markAsTouched();
    if (this.nameUpdateCategory.valid) {

      this.categoryService.updateCategory(this.categoryIdEdit, { name: this.nameUpdateCategory.value })
        .subscribe(() => {
          console.log("Update Category Success!");
          this.btnCloseEditRef.nativeElement.click();
        })

    }
  }

  openModal(): void {
    this.addModal.show();
  }

  getErrorMessage(formControl: AbstractControl): string {
      if (formControl.hasError('required')) return "Không được để trống";
  
      if (formControl.hasError('min')) {
        const minVal = formControl.errors?.['min'].min;
        return `Tối thiểu ${minVal} $`;
      }
  
  
      if (formControl.hasError('minlength')) {
        const minLength = formControl.errors?.['minlength'].requiredLength;
        return `Tối thiểu ${minLength} ký tự`;
      }
  
      return "";
  }



  trackByCategories(index: number, category: Category): number {
      return category.id;
  }

  
}
