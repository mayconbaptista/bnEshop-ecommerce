import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiAvailabilityService } from '../services/api-availability.service';

/**
 * Status que significam "ninguem atendeu", e nao "a API respondeu com erro":
 * - 0: sem resposta (rede caiu, gateway local desligado)
 * - 502/503/504: o CloudFront nao alcancou a origem ou o Traefik nao achou
 *   um servico de pe (containers ainda subindo).
 * - 520-524 e 530: erros da Cloudflare entre a borda e a origem. O 530
 *   (erro 1033, tunnel sem conexao) e o caso normal fora da agenda, com a EC2
 *   desligada.
 *
 * Um 4xx/500 prova que a API esta de pe; so o conteudo da resposta e ruim.
 */
const ORIGIN_UNAVAILABLE = new Set([0, 502, 503, 504, 520, 521, 522, 523, 524, 530]);

export const apiAvailabilityInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(`${environment.apiUrl}/`)) {
    return next(req);
  }

  const availability = inject(ApiAvailabilityService);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          availability.markOnline();
        }
      },
      error: (error: unknown) => {
        if (!(error instanceof HttpErrorResponse)) {
          return;
        }

        if (ORIGIN_UNAVAILABLE.has(error.status)) {
          availability.markOffline();
        } else {
          availability.markOnline();
        }
      },
    }),
  );
};
