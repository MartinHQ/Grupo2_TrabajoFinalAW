import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/Usuario';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListarPreguntafrecuenteComponent } from '../preguntafrecuente/listar-preguntafrecuente/listar-preguntafrecuente.component';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Reporte01Component } from '../reportes/reporte01/reporte01.component';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    CommonModule,
    RouterOutlet,
    ListarPreguntafrecuenteComponent,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    Reporte01Component
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  usuarioLogeado: Usuario = new Usuario();

  constructor(private lS: LoginService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.usuarioLogeado = this.lS.getCurrentUser()!;
  }

  ngAfterViewInit(): void {
    this.usuarioLogeado = this.lS.getCurrentUser()!;
  }
}
