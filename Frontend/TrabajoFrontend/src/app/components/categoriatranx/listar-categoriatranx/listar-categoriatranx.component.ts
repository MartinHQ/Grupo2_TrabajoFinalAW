import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriaTranx } from '../../../models/CategoriaTranx';
import { CategoriatranxService } from '../../../services/categoriatranx.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-listar-categoriatranx',
  standalone: true,
  imports: [MatPaginator, MatTableModule, MatPaginatorModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listar-categoriatranx.component.html',
  styleUrls: ['./listar-categoriatranx.component.css']
})
export class ListarCategoriatranxComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'idCategoriatranx',
    'nombre',
    'descripcion',
    'accion01'
  ];

  datasource: MatTableDataSource<CategoriaTranx> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ctS: CategoriatranxService) { }

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

  deleteCategoria(id:number){
    this.ctS.delete(id).subscribe(()=>{
      this.ctS.listar().subscribe((data)=> {
        this.datasource.data=data;
      })
    })
  }
}
