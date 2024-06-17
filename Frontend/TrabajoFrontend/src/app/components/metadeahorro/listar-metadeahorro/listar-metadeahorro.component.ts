import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MetaDeAhorro } from '../../../models/MetaDeAhorro';
import { MetadeahorroService } from '../../../services/metadeahorro.service';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-listar-metadeahorro',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    NgIf,
    NgFor,
    ConfirmDialogComponent,
    MatDialogModule,
  ],
  templateUrl: './listar-metadeahorro.component.html',
  styleUrl: './listar-metadeahorro.component.css',
})
export class ListarMetadeahorroComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'descripcion',
    'montoobjetivo',
    'fechalimite',
    'tipometanombre',
    'usuarionombre',
    'metacumplida',
    'accion01',
    'accion02',
  ];

  datasource: MatTableDataSource<MetaDeAhorro> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MetadeahorroService, private dialog: MatDialog) {}

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { entityName: 'Categoría de transacción' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminar(id);
      }
    });
  }
  ngOnInit(): void {
    this.mS.listar().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });

    this.mS.getListaCambio().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.mS.eliminar(id).subscribe((data) => {
      this.mS.listar().subscribe((data) => {
        this.mS.setListaCambio(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }
}
