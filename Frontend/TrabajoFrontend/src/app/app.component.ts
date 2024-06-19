import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    MatSidenavModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TrabajoFrontend';

  role: string = '';
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
    sessionStorage.removeItem('token');
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
  isCliente() {
    return this.role === 'CLIENTE';
  }
}
