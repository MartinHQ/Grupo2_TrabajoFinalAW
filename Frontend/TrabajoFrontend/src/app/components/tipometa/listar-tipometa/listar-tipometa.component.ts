import { AfterViewInit, Component, OnInit,ViewChild, } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TipoMeta } from '../../../models/TipoMeta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TipometaService } from '../../../services/tipometa.service';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-listar-tipometa',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './listar-tipometa.component.html',
  styleUrl: './listar-tipometa.component.css'
})
export class ListarTipometaComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'idTipoMeta',
    'nombre',
    'accion01',
    'accion02'
  ];
 
  datasource: MatTableDataSource<TipoMeta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tmS: TipometaService) { }

  ngOnInit(): void {
    this.tmS.listar().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });
    this.tmS.getListaCambio().subscribe((data) => {
      this.datasource.data = data;
      this.datasource.paginator = this.paginator;
    });
  }
  eliminar(id:number){
    this.tmS.eliminar(id).subscribe((data)=>{
      this.tmS.listar().subscribe((data)=>{
        this.tmS.setListaCambio(data);
      })
    })
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }
}
