import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    phoneNumber: ['09734523', [Validators.required, Validators.minLength(8)]],
    password: ['123456789', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if (this.loginForm.valid) {
      const { phoneNumber, password } = this.loginForm.value;

      this.authService.login(phoneNumber!, password!).subscribe({
        next: () => {
          this.router.navigate(['/home']);

        },
        error: (err: HttpErrorResponse) => {
          console.error("Login fail: ", err.error);
        }
      })
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

  get phoneNumber(): AbstractControl {
    return this.loginForm.get('phoneNumber')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  
}
