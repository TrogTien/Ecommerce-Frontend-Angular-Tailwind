import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private api: ApiService,
    private tokenService: TokenService
  ) { }

  login(phoneNumber: string, password: string) {
    return this.api.login(phoneNumber, password).pipe(
      tap((res: HttpResponse<any>) => {
        const { token } = res.body;
        this.tokenService.setAccessToken(token);

        this.isLoggedInSubject.next(true);

        console.log('Login Successful');

      })
    )
  }

  register(data: any) {
    return this.api.register(data).pipe(
      tap(() => {
        console.log("Register Successful");
      })
    )
  }

  logout(): void {
    this.tokenService.removeAuthToken();
    this.isLoggedInSubject.next(false);
  }

  getProfile() {
    return this.api.get("users/profile").pipe(
      tap((res) => {
        console.log(res.roles);
        this.isLoggedInSubject.next(true);
      })
    )
  }
}
