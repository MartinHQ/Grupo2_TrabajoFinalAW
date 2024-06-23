import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsejoService } from '../../../services/consejo.service';
import { Consejo } from '../../../models/Consejo';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-consejo',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ConfirmDialogComponent,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './listar-consejo.component.html',
  styleUrl: './listar-consejo.component.css',
})
export class ListarConsejoComponent implements OnInit, AfterViewInit {
  rol: string = '';
  keyword: string = ''; // Añadir propiedad para la palabra clave
  dataSource: MatTableDataSource<Consejo> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs?: Observable<any>;

  constructor(private CS: ConsejoService,
    private dialog: MatDialog,
    private lS: LoginService) {}

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { entityName: 'Consejo' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminar(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.verificar()
  }

  ngOnInit(): void {
    this.loadConsejos();
  }

  loadConsejos(): void {
    this.CS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  buscarConsejos(): void {
    this.CS.buscarKeyword(this.keyword).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  restablecerLista(): void {
    this.keyword = '';
    this.loadConsejos();
  }

  eliminar(id: number) {
    this.CS.eliminar(id).subscribe(() => {
      this.loadConsejos();
    });
  }

  verificar() {
    this.rol = this.lS.showRole();
    return this.lS.verificar();
  }

  isAdmin() {
    return this.rol === 'ADMIN';
  }
  isCliente() {
    return this.rol === 'CLIENTE';
  }
}
