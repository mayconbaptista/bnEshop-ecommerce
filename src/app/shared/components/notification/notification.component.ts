import { Component } from '@angular/core';

export interface ProblemDetailsResponse{
  title:string;
  status:number;
  detail:string;
  extensions:Record<string, any>;
}

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  problemDetails: ProblemDetailsResponse | null = null;
}
