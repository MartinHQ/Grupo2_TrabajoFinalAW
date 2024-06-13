import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Transaccion } from '../../../models/Transaccion';
import { TransaccionService } from '../../../services/transaccion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listar-transaccion',
  standalone: true,
  imports: [
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatSort,
    MatSortModule,
    NgIf,
    MatCheckboxModule,
    FormsModule,
    ConfirmDialogComponent,
    MatDialogModule,
  ],
  templateUrl: './listar-transaccion.component.html',
  styleUrl: './listar-transaccion.component.css',
})
export class ListarTransaccionComponent implements OnInit {
  // Variables para los checkboxes
  showIngresos: boolean = false;
  showEgresos: boolean = false;

  dataSource: MatTableDataSource<Transaccion> = new MatTableDataSource();
  // Variable para almacenar todos los datos originales
  originalData: Transaccion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private tS: TransaccionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

mensaje: string = ''

//Cuadro de confirmacion para eliminar una transaccion...
openDialog(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data:{entityName: 'transacción'}
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.deleteTransaccion(id);
    }
  });
}


  ngOnInit(): void {
    // Inicializa la tabla con las transacciones
    this.tS.listar().subscribe((data) => {
      this.originalData = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Suscribirse a los cambios en la lista de transacciones
    this.tS.getListaCambio().subscribe((data) => {
      this.originalData = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Elimina una transacción por ID
  deleteTransaccion(id: number) {
    this.tS.delete(id).subscribe(() => {
      this.tS.listar().subscribe((data) => {
        this.originalData = data;
        this.dataSource.data = data;
        this.mensaje = 'Transacción eliminada correctamente';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      });
    });
  }

  // Aplica el filtro a las transacciones basándose en los checkboxes seleccionados
  applyFilter() {
    let filteredData = this.originalData;

    if (this.showIngresos && !this.showEgresos) {
      // Filtrar solo ingresos
      filteredData = this.originalData.filter((t) => t.es_ingresoTransaccion);
    } else if (!this.showIngresos && this.showEgresos) {
      // Filtrar solo egresos
      filteredData = this.originalData.filter((t) => !t.es_ingresoTransaccion);
    } // Si ambos están seleccionados o ambos deseleccionados, mostrar todos

    // Actualiza el dataSource con los datos filtrados
    this.dataSource.data = filteredData;
  }

  displayedColumns: string[] = [
    'nombreTransaccion',
    'montoTransaccion',
    'fechaTransaccion',
    'es_ingresoTransaccion',
    'es_manual',
    'categoria_id',
    'accion01',
  ];
}
