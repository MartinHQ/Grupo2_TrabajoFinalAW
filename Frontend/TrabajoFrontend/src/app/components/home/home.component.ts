import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/Usuario';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListarPreguntafrecuenteComponent } from '../preguntafrecuente/listar-preguntafrecuente/listar-preguntafrecuente.component';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Reporte01Component } from '../reportes/promedioingresoegresopormes/reporte01.component';
import { ConsejoService } from '../../services/consejo.service';
import { Consejo } from '../../models/Consejo';
import { NgFor } from '@angular/common';
import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion } from '../../models/Transaccion';
import { MetaDeAhorro } from '../../models/MetaDeAhorro';
import { MetadeahorroService } from '../../services/metadeahorro.service';
import {MatChipsModule} from '@angular/material/chips';
import { MaxmontobycategoriaComponent } from '../reportes/maxmontobycategoria/maxmontobycategoria.component';
import { Reporte02Component } from '../reportes/reporte02/reporte02.component';
import { ChangeDetectorRef } from '@angular/core';
import { ReportePromediotransaccionComponent } from '../reportes/reporte-promediotransaccion/reporte-promediotransaccion.component';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriaspopularesComponent } from '../reportes/categoriaspopulares/categoriaspopulares.component';
import { TopSaldosUsuariosComponent } from '../reportes/top-saldos-usuarios/top-saldos-usuarios.component';
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
    Reporte01Component,
    MatChipsModule,
    MaxmontobycategoriaComponent,
    Reporte02Component, ReportePromediotransaccionComponent,
    CategoriaspopularesComponent,
    TopSaldosUsuariosComponent
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  usuarioLogeado: Usuario = this.lS.getCurrentUser()!;
  consejos: Consejo[] = [];
  transacciones: Transaccion[] = [];
  haytransacciones: boolean = false;
  metas : MetaDeAhorro[] = [];
  haymetas : boolean = false;
  role: string = '';

  constructor(
    private lS: LoginService,
    public route: ActivatedRoute,
    private cS: ConsejoService,
    private tS: TransaccionService,
    private mS : MetadeahorroService,
    private cdr: ChangeDetectorRef,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {

    console.log('Home',this.usuarioLogeado)
    this.cdr.detectChanges(); // Forzar la detección de cambios
    this.usuarioLogeado = this.lS.getCurrentUser()!;

    this.cS.list().subscribe((data) => {
      this.consejos = data;
      console.log('Consejos cargados:', this.consejos);
    });

    this.tS.listarPorUsuarioOrdenadas(this.usuarioLogeado.usuario_id).subscribe((data) => {
      this.transacciones = data;
      this.haytransacciones = this.transacciones.length > 0;
      console.log('Transacciones cargadas:', this.transacciones);
    });

    //cambiar el metodo cuando se implemente el servicio listar por usuario...
    this.mS.listarporusuarioactivo(this.usuarioLogeado.usuario_id ).subscribe((data) => {
      this.metas = data;
      this.haymetas = this.metas.length > 0;
      console.log('Metas cargadas:', this.metas);});

    this.verificar();
    this.isAdmin();
    this.isCliente();
    this.SetAhorroAcumulado();


  }

  ngAfterViewInit(): void {
    this.usuarioLogeado = this.lS.getCurrentUser()!;
    this.cS.list().subscribe((data) => {
      this.consejos = data;
    });

    this.verificar();
    this.isAdmin();
    this.isCliente();
  }

  verificar() {
    this.role = this.lS.showRole();
    return this.lS.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
  isCliente() {
    return this.role === 'CLIENTE';
  }


  SetAhorroAcumulado(){
    this.tS.getAhorroAcumulado(this.usuarioLogeado.usuario_id).subscribe((data) => {
      this.usuarioLogeado.ahorro_acumulado = data;
      this.uS.update(this.usuarioLogeado)
    });
  }
}
