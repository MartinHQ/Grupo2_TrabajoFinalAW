import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Transaccion } from '../../../models/Transaccion';
import { TransaccionService } from '../../../services/transaccion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriaTranx } from '../../../models/CategoriaTranx';
import { NgIf } from '@angular/common';

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
    NgIf
    
  ],
  templateUrl: './listar-transaccion.component.html',
  styleUrl: './listar-transaccion.component.css',
})
export class ListarTransaccionComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreTransaccion',
    'montoTransaccion',
    'fechaTransaccion',
    'es_ingresoTransaccion',
    'es_manual',
    'categoria_id',
    'accion01',
  ];
  dataSource: MatTableDataSource<Transaccion> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private tS: TransaccionService) {}

  ngOnInit(): void {
      this.tS.listar().subscribe((data)=>{
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

      this.tS.getListaCambio().subscribe((data)=>{
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteTransaccion(id:number){
    this.tS.delete(id).subscribe(()=>{
      this.tS.listar().subscribe((data)=>{
        this.dataSource.data = data;
      })
    })
  }
}
