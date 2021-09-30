import { environment } from './environment';

export const Endpoints = {
  security: {
    login: `${environment.baseUrl}/login?delay=2`
  },
  demo: {
    colors: `${environment.baseUrl}/unknown`
  }
};

export const TokenExcludedEndpoints = [
  'login'
];
