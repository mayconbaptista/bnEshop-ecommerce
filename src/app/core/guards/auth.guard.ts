import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  //private loginApiService: LoginApiService = inject(LoginApiService);

  const token = localStorage.getItem('accessToken');

  return  false;
};
