import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ConsejoService } from '../../../services/consejo.service';
import { Consejo } from '../../../models/Consejo';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-consejo',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatIconModule, 
    MatButtonModule,
    RouterLink],
  templateUrl: './listar-consejo.component.html',
  styleUrl: './listar-consejo.component.css'
})
export class ListarConsejoComponent implements OnInit, AfterViewInit{

  Columnas: string[] = ['codigo', 'titulo', 'descripcion', 'accion01'];
  dataSource: MatTableDataSource<Consejo> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private CS: ConsejoService){}

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.CS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    this.CS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  eliminar(id: number){
      this.CS.eliminar(id).subscribe(()=>{
        this.CS.list().subscribe((data)=> {
          this.CS.setList(data);
        })
      })
  }
}
