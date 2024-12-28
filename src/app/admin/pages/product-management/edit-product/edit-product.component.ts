import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  @Input() productId!: string;
  @ViewChild('inputImage') inputImage!: ElementRef;
  categories$: Observable<Category[]> | undefined;
  
  productForm!: FormGroup;
  imageFiles: File[] = [];
  previewImgs: string[] = [];
  newImgs: string[] = [];

  originThumb: string = "";



  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name: ['Nguyen Tien', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
    })

    // API
    this.categories$ = this.categoryService.getAllCategories();

    this.productService.getProduct(this.productId).subscribe((data: ProductResponse) => {
      console.log(data);
      //form
      this.productForm.patchValue({
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.category_id
      })
      //preview images
      const images = data.imageUrls;
      this.originThumb = "http://localhost:8088/images/" + images[0]; //get thumbnail name in db
      images.forEach((val, index) => {
        this.previewImgs.push("http://localhost:8088/images/" + val);
      })
    })

  }

  triggerFileInput(): void {
    this.inputImage.nativeElement.click();
  }

  onFileSelect(event: any) {
    if (event.target.files.length + this.newImgs.length + this.previewImgs.length > 5) {
      alert('Bạn chỉ được chọn tối đa 5 files');
      return;
    }

    const allowedTypeImage = ["image/png", "image/jpeg", "image/jpg"];

    
    if (event.target.files.length > 0) {
      //check imageFile empty
      const files: File[] = Array.from(event.target.files);

      if (this.imageFiles.length > 0) {
        console.log("file: " + files);
        files.forEach((val, index) => {
          this.imageFiles.push(val)
        })
      } else {

        this.imageFiles = Array.from(event.target.files);
      }

      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i];
        
        if (allowedTypeImage.includes(currentFile.type)) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.newImgs.push(e.target?.result);
          };
          reader.readAsDataURL(currentFile);
        } else {
          console.log("File không hợp lệ")
        }

      }
    }

  }
  // Delete
  closeOldImage(index: number) {
   

   
    const arrUrl: string[] = this.previewImgs[index].split('/');
    const fileName = arrUrl[arrUrl.length - 1];

    this.productImageService.deleteOneImage(fileName).subscribe(() => {
      console.log("Delete image successful!")
      this.previewImgs.splice(index, 1);
    });
    

    // Xóa ảnh củ khỏi previewImgs và database
  }

  closeFileImage(index: number) {
    this.imageFiles.splice(index, 1);

    if (this.imageFiles.length == 0 && this.inputImage.nativeElement.value != "") {
      this.inputImage.nativeElement.value = "";
    }

    this.newImgs.splice(index, 1);

  }

  // closeImage(index: number) {
  //   const numberPreviews = this.previewImgs.length - this.imageFiles.length;
  //   const fileIndex = index - numberPreviews;

   
  //   if (fileIndex < 0) {
  //     const arrUrl: string[] = this.previewImgs[index].split('/');
  //     const fileName = arrUrl[arrUrl.length - 1];
  //     console.log(fileName)
  //     this.productImageService.deleteOneImage(fileName).subscribe(() => {
  //       console.log("Delete image successful!")
  //     });
  //   } else {
  //     // xoa file
  //     this.imageFiles.splice(fileIndex, 1);
  //     //Reset input file de sau khi xoa chon lai file nhu cũ được 
  //     if (this.imageFiles.length == 0 && this.inputImage.nativeElement.value != "") {
  //       this.inputImage.nativeElement.value = "";
  //     }
  //   }

  //   // Xóa ảnh khỏi previewImgs
  //   this.previewImgs.splice(index, 1);

    
  // }

  onSubmitForm(): void {
    this.markAllControlsTouched(this.productForm);

    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productName.value);
      formData.append('categoryId', this.categoryId.value);
      formData.append('price', this.price.value);
      formData.append('description', this.description.value);
      // If file thumbnail change
      if (this.previewImgs[0] !== this.originThumb) {
        formData.append('thumbnail', this.imageFiles[0]);
      }
      // Edit product api
      this.productService.updateProduct(this.productId, formData).subscribe(() => {
        console.log("Updated!");
        this.router.navigate(['/admin/products']);

      })

      // Upload Product Images api
      const formDataImages = new FormData();
      for (let i = 0; i < this.imageFiles.length; i++) {

        formDataImages.append('files', this.imageFiles[i]);
      }    
      this.productImageService
        .uploadProductImages(formDataImages, this.productId).subscribe(() => {
          console.log("Uploads Product Images success!");
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
