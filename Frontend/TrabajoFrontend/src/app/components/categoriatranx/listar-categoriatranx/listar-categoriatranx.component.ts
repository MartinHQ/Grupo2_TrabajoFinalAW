import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriaTranx } from '../../../models/CategoriaTranx';
import { CategoriatranxService } from '../../../services/categoriatranx.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listar-categoriatranx',
  standalone: true,
  imports: [
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    ConfirmDialogComponent,
    MatDialogModule
  ],
  templateUrl: './listar-categoriatranx.component.html',
  styleUrls: ['./listar-categoriatranx.component.css'],
})
export class ListarCategoriatranxComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'idCategoriatranx',
    'nombre',
    'descripcion',
    'accion01',
  ];

  datasource: MatTableDataSource<CategoriaTranx> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ctS: CategoriatranxService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  mensaje: string = '';

  //Cuadro de confirmacion para eliminar una categoria de transaccion...
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{entityName: 'Categoría de transacción'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategoria(id);
      }
    });
  }

  ngOnInit(): void {
    this.ctS.listar().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });

    this.ctS.getListaCambio().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }

  deleteCategoria(id: number) {
    this.ctS.delete(id).subscribe(() => {
      this.ctS.listar().subscribe((data) => {
        this.datasource.data = data;
        this.mensaje = 'Categoria eliminada correctamente';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      });
    });
  }
}
