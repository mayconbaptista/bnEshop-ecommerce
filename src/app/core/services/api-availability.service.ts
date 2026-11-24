import { Injectable, signal } from '@angular/core';

/**
 * Estado global "a API esta respondendo?".
 *
 * Alimentado pelo apiAvailabilityInterceptor a partir das respostas reais,
 * sem polling: nao gera trafego extra nem mantem a EC2 ocupada.
 */
@Injectable({ providedIn: 'root' })
export class ApiAvailabilityService {
  private readonly unavailable = signal(false);

  readonly offline = this.unavailable.asReadonly();

  markOffline(): void {
    this.unavailable.set(true);
  }

  markOnline(): void {
    this.unavailable.set(false);
  }
}
