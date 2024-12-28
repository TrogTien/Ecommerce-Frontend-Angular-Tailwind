import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChild('inputImage') inputImage!: ElementRef;
  categories$: Observable<Category[]> | undefined;
  
  productForm!: FormGroup;
  imageFiles!: FileList;
  previewImgs: string[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();


    this.productForm = this.formBuilder.group({
      name: ['Nguyen Tien', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
    })
  }

  triggerFileInput(): void {
    this.inputImage.nativeElement.click();
  }

  onFileSelect(event: any) {
    if (event.target.files.length + this.previewImgs.length > 5) {
      alert('Bạn chỉ được chọn tối đa 5 files');
      return;
    }

    const allowedTypeImage = ["image/png", "image/jpeg", "image/jpg"];
    
    if (event.target.files.length > 0) {
      this.imageFiles = event.target.files;
      for (let i = 0; i < this.imageFiles?.length; i++) {
        const currentFile = this.imageFiles[i];
        
        if (allowedTypeImage.includes(currentFile.type)) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previewImgs.push(e.target?.result);
          };
          reader.readAsDataURL(currentFile);
        } else {
          console.log("File không hợp lệ")
        }

      }
    }

  }

  onSubmitForm(): void {
    this.markAllControlsTouched(this.productForm);

    if (this.productForm.valid && this.previewImgs.length > 0) {
      const formData = new FormData();
      formData.append('name', this.productName.value);
      formData.append('categoryId', this.categoryId.value);
      formData.append('price', this.price.value);
      formData.append('description', this.description.value);
      formData.append('thumbnail', this.imageFiles[0]);
      // Send 2 api
      this.productService.addProduct(formData).pipe(
        switchMap(productRes => {
          const productId = productRes.id;
          const formDataImages = new FormData();
          for (let i = 0; i < this.imageFiles.length; i++) {

            formDataImages.append('files', this.imageFiles[i]);
          }
          return this.productImageService.uploadProductImages(formDataImages, productId);
        })
      ).subscribe(() => {
        console.log("Add Product and Product Images success!");
      })


    } else {
      console.warn("INVALID")
    }
  }

  markAllControlsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } 
    });
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

  // Getter
  get productName(): AbstractControl {
    return this.productForm.get('name')!;
  }

  get categoryId(): AbstractControl {
    return this.productForm.get('categoryId')!;
  }

  get price(): AbstractControl {
    return this.productForm.get('price')!;
  }

  get description(): AbstractControl {
    return this.productForm.get('description')!;
  }
}
