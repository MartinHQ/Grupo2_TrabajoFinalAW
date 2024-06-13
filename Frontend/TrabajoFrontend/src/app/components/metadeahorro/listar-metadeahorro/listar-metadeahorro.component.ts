import { AfterViewInit, Component, OnInit,ViewChild, } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MetaDeAhorro } from '../../../models/MetaDeAhorro';
import { MetadeahorroService } from '../../../services/metadeahorro.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-listar-metadeahorro',
  standalone: true,
  imports: [MatPaginatorModule, 
           MatTableModule,
           MatIconModule,
           RouterLink,
           MatButtonModule,
           NgIf],
  templateUrl: './listar-metadeahorro.component.html',
  styleUrl: './listar-metadeahorro.component.css'
})
export class ListarMetadeahorroComponent implements OnInit, AfterViewInit{
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

  constructor(private mS: MetadeahorroService) { }

  ngOnInit(): void {
   this.mS.listar().subscribe((data)=>{
    this.datasource.data=data;
    this.datasource.paginator=this.paginator;
   });

   this.mS.getListaCambio().subscribe((data)=>{
    this.datasource.data=data;
    this.datasource.paginator=this.paginator;
   });
  }

  eliminar(id:number){
    this.mS.eliminar(id).subscribe((data)=>{
      this.mS.listar().subscribe((data)=>{
        this.mS.setListaCambio(data);
      })
    });
  }
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }

}
