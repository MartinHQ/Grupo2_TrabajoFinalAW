import { Component, ViewChild, OnInit,  } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Transaccion } from '../../../models/Transaccion';
import { TransaccionService } from '../../../services/transaccion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-listar-transaccion',
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
    MatTableModule,
    MatSort,
    MatSortModule,
    NgIf,
    NgFor,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ConfirmDialogComponent,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule
    
    
  ],
  templateUrl: './listar-transaccion.component.html',
  styleUrl: './listar-transaccion.component.css',

})
export class ListarTransaccionComponent implements OnInit {
  showIngresos: boolean = false;
  showEgresos: boolean = false;
  dataSource: MatTableDataSource<Transaccion> = new MatTableDataSource();
  originalData: Transaccion[] = [];
  obs?: Observable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tS: TransaccionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  mensaje: string = '';

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { entityName: 'transacción' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTransaccion(id);
      }
    });
  }

  ngOnInit(): void {
    this.tS.listar().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });

    this.tS.getListaCambio().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.obs = this.dataSource.connect();
    });
  }

  deleteTransaccion(id: number) {
    this.tS.delete(id).subscribe(() => {
      this.tS.listar().subscribe((data) => {
        this.tS.setListaCambio(data)
        this.mensaje = 'Transacción eliminada correctamente';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      });
    });
  }

  
}

