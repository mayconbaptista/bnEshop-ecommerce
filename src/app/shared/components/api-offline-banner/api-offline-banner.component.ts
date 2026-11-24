import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiAvailabilityService } from '../../../core/services/api-availability.service';
import { environment } from '../../../../environments/environment';

/**
 * Faixa exibida quando a API nao responde. Em staging, transforma um erro
 * generico em uma explicacao: o ambiente desliga fora do horario para
 * economizar custos de nuvem (FinOps), e o visitante sabe quando voltar.
 */
@Component({
  selector: 'app-api-offline-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (availability.offline()) {
      <div
        role="status"
        aria-live="polite"
        class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
      >
        <p>
          <strong>Servidor indisponível no momento.</strong>
          {{ notice }}
        </p>
        <button
          type="button"
          (click)="retry()"
          class="rounded-md border border-amber-300 px-3 py-1 font-medium hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:hover:bg-amber-900"
        >
          Tentar novamente
        </button>
      </div>
    }
  `,
})
export class ApiOfflineBannerComponent {
  protected readonly availability = inject(ApiAvailabilityService);
  protected readonly notice = environment.apiAvailabilityNotice;

  protected retry(): void {
    window.location.reload();
  }
}
