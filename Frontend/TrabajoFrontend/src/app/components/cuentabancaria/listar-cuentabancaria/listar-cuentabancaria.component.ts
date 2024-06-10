import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CuentabancariaService } from '../../../services/cuentabancaria.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CuentaBancaria } from '../../../models/CuentaBancaria';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-listar-cuentabancaria',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './listar-cuentabancaria.component.html',
  styleUrl: './listar-cuentabancaria.component.css',
})
export class ListarCuentabancariaComponent implements OnInit, AfterViewInit{
  constructor(private cbS: CuentabancariaService) {}

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'numerocuenta',
    'tipo',
    'usuario',
    'acciones',
  ];

  datasource: MatTableDataSource<CuentaBancaria> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cbS.listar().subscribe((data) => {
      this.datasource= new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });

    this.cbS.getListaCambio().subscribe((data) => {
      this.datasource= new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cbS.eliminar(id).subscribe(() => {
      this.cbS.listar().subscribe((data) => {
        this.cbS.setListaCambio(data);
      });
    });
  }
}
