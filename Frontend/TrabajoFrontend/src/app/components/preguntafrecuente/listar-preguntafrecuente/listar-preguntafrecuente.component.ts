import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntafrecuenteService } from '../../../services/preguntafrecuente.service';
import { PreguntaFrecuente } from '../../../models/PreguntaFrecuente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-listar-preguntafrecuente',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButton,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule,
    MatGridListModule,
  ],
  templateUrl: './listar-preguntafrecuente.component.html',
  styleUrl: './listar-preguntafrecuente.component.css',
})
export class ListarPreguntafrecuenteComponent implements OnInit {
  constructor(private pfS: PreguntafrecuenteService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource: MatTableDataSource<PreguntaFrecuente> = new MatTableDataSource();
  obs?: Observable<any>; // objeto para listar,filtrar las tarjetas y usar el paginator
  rol: string = ''

  ngOnInit(): void {
    this.pfS.listar().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
      this.obs = this.datasource.connect();
    });
    this.pfS.getListaCambio().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
      this.obs = this.datasource.connect();
    });
  }

  eliminar(id: number) {
    this.pfS.eliminar(id).subscribe(() => {
      this.pfS.listar().subscribe((data) => {
        this.pfS.setListaCambio(data);
      });
    });
  }

  isAdmin() {
    return this.rol === 'ADMIN';
  }
  isCliente() {
    return this.rol === 'CLIENTE';
  }
}
