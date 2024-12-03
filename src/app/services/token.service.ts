import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'x-access-token';

  
  constructor() { }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeAllToken(): void {
    localStorage.clear();
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  //
  getUserId(): number | null {
    const token = this.getAccessToken();
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodePayload = JSON.parse(atob(payload));
        return decodePayload.user_id || null;
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return null;
  }


}
