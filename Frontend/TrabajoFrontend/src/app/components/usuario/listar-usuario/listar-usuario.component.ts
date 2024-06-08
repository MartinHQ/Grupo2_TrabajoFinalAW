import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatIconModule, 
    MatButtonModule,
    RouterLink],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit, AfterViewInit{
  Columnas: string[] = ['codigo', 'nombre', 'apellido', 'correo', 'registro', 'ahorro', 'acciones'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private US: UsuarioService){}
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.US.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

  this.US.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  eliminar(id: number){
    this.US.eliminar(id).subscribe(()=>{
      this.US.list().subscribe((data)=> {
        this.US.setList(data);
      })
    })
  }
}
