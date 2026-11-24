import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ApiAvailabilityService } from '../services/api-availability.service';
import { apiAvailabilityInterceptor } from './api-availability.interceptor';

describe('apiAvailabilityInterceptor', () => {
  const apiEndpoint = `${environment.apiUrl}/api/catalog/product/filter`;
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  let availability: ApiAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiAvailabilityInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    availability = TestBed.inject(ApiAvailabilityService);
  });

  afterEach(() => httpTesting.verify());

  it('marca offline quando o CloudFront nao alcanca a origem (504)', () => {
    http.get(apiEndpoint).subscribe({ error: () => undefined });

    httpTesting.expectOne(apiEndpoint).flush(null, { status: 504, statusText: 'Gateway Timeout' });

    expect(availability.offline()).toBeTrue();
  });

  it('marca offline quando o Cloudflare Tunnel esta sem conexao (530, EC2 desligada)', () => {
    http.get(apiEndpoint).subscribe({ error: () => undefined });

    httpTesting.expectOne(apiEndpoint).flush(null, { status: 530, statusText: 'Origin Error' });

    expect(availability.offline()).toBeTrue();
  });

  it('volta a online quando a API responde', () => {
    availability.markOffline();

    http.get(apiEndpoint).subscribe();
    httpTesting.expectOne(apiEndpoint).flush([]);

    expect(availability.offline()).toBeFalse();
  });

  it('trata 4xx como API no ar (erro de negocio, nao de disponibilidade)', () => {
    availability.markOffline();

    http.get(apiEndpoint).subscribe({ error: () => undefined });
    httpTesting.expectOne(apiEndpoint).flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(availability.offline()).toBeFalse();
  });
});
