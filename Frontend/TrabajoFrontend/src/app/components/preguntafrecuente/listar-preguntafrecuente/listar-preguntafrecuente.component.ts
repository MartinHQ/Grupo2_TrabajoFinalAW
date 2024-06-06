import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntafrecuenteService } from '../../../services/preguntafrecuente.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PreguntaFrecuente } from '../../../models/PreguntaFrecuente';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-preguntafrecuente',
  standalone: true,
  imports: [
    MatPaginator,
    FormsModule,
    MatTableModule,
    CommonModule,
    MatButton,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listar-preguntafrecuente.component.html',
  styleUrl: './listar-preguntafrecuente.component.css',
})
export class ListarPreguntafrecuenteComponent implements OnInit {
  constructor(private pfS: PreguntafrecuenteService) {}

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.pfS.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
    this.pfS.getListaCambio().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  displayedColumns: string[] = ['codigo', 'pregunta', 'respuesta', 'acciones'];
  dataSource: MatTableDataSource<PreguntaFrecuente> = new MatTableDataSource();
}
