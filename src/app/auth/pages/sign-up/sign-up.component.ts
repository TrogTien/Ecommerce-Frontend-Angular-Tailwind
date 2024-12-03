import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Datepicker, initDatepickers } from 'flowbite';

import { passwordMatchValidator } from 'src/app/validators/password-match.validator';
import { ageValidator } from 'src/app/validators/age-18.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild("myDatePicker") datePickerRef! : ElementRef ; 
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    const datePickerEl: HTMLElement = this.datePickerRef.nativeElement;

    
    
    const datepicker = new Datepicker(datePickerEl);
    
    
    
    datePickerEl.addEventListener('changeDate', (e: any) => {
      const value = e.target.value;
      const formControl = this.birthday;
      formControl?.setValue(value);
      formControl?.markAsUntouched();
    });
    
  }
  
  
  
  signUpForm = this.formBuilder.group({
    phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    username: ['', [Validators.required]],
    birthday: ['01/30/2001', [Validators.required, ageValidator()]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    

  }, { validators: passwordMatchValidator("password", "confirmPassword") });

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const [month, day, year] = this.birthday.value.split('/');
      const dateOfBirth = `${year}-${month}-${day}`;

      const data = {
        "full_name": this.username.value,
        "phone_number": this.phoneNumber.value,
        "address": this.address.value,
        "date_of_birth": dateOfBirth,
        "password": this.password.value,
        "retype_password": this.confirmPassword.value,
        "facebook_account_id": 0,
        "google_account_id": 0,
        "role_id": 1
      }

      this.authService.register(data).subscribe({
        next: () => {
          this.router.navigate(['/home'])        ;
        },
        error:  (err: HttpErrorResponse) => {
          console.log("Register fail: ", err);
        }
      })

      // console.log(data);

    } else {
      console.warn("INVALID");
    }
    

  }

  getErrorMessage(formControl: AbstractControl): string {
    if (formControl.hasError('required')) return "Không được để trống";

    if (formControl.hasError('minlength')) {
      const minLength = formControl.errors?.['minlength'].requiredLength;
      return `Tối thiểu ${minLength} ký tự`;
    }



    return "";
  }

  

  

  // Getter

  get phoneNumber(): AbstractControl {
    return this.signUpForm.get('phoneNumber')!;
  }

  get username(): AbstractControl {
    return this.signUpForm.get('username')!;
  }

  get birthday(): AbstractControl {
    return this.signUpForm.get('birthday')!;
  }

  get address(): AbstractControl {
    return this.signUpForm.get('address')!;
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.signUpForm.get('confirmPassword')!;
  }
}
