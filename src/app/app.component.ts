import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "APPLICATION - DILEMME DU PRISONIER ITÉRÉ";

  constructor() {
    console.log(environment.production); // Logs false for default environment
  }
}
