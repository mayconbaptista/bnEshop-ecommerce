import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProblemDetailsResponse } from '../models/problem-details-response';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationHandlerService {

  private toastr: ToastrService = inject(ToastrService);

  constructor() { }

  public handleHttpSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  public handleHttpError(errorResponse: HttpErrorResponse): void {
    const problemDetails = errorResponse.error as ProblemDetailsResponse;

    if (!this.isProblemDetails(problemDetails)) {
      this.handleGenericHttpError(errorResponse);
      return;
    }

    if (problemDetails.status === 400) {
      this.handleBadRequest(problemDetails);
    } else if (problemDetails.status > 400 && problemDetails.status < 500) {
      this.toastr.warning(problemDetails.detail, problemDetails.title);
    } else if (problemDetails.status >= 500) {
      this.toastr.error(problemDetails.detail, problemDetails.title || 'Erro no Servidor');
    } else {
      this.toastr.info(problemDetails.detail, problemDetails.title);
    }
  }

  private handleBadRequest(problem: ProblemDetailsResponse): void {
    let message = problem.detail || 'Existem erros no formulário.';
    let validationErrorsHtml = '';

    if (problem.extensions && problem.extensions['errors']) {
      const errors = problem.extensions['errors'];
      validationErrorsHtml = '<ul>';
      for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
          validationErrorsHtml += `<li><strong>${key}:</strong> ${errors[key].join(', ')}</li>`;
        }
      }
      validationErrorsHtml += '</ul>';
    }

    if (validationErrorsHtml) {
        message += '<br/>' + validationErrorsHtml;
        this.toastr.warning(message, problem.title, { enableHtml: true, timeOut: 8000 }); // Mais tempo para ler
    } else {
      this.toastr.warning(message, problem.title);
    }
  }

  private handleGenericHttpError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.toastr.error('Não foi possível conectar ao servidor.', 'Erro de Conexão');
    } else if (error.status >= 500) {
       this.toastr.error('Ocorreu um erro inesperado no servidor.', `Erro ${error.status}`);
    } else {
      this.toastr.warning(error.statusText || 'Ação não pôde ser concluída.', `Atenção (${error.status})`);
    }
  }

  private isProblemDetails(object: any): object is ProblemDetailsResponse {
    return object && 'title' in object && 'status' in object && 'detail' in object;
  }
}