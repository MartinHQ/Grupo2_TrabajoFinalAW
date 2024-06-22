import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MetaDeAhorro } from '../../../models/MetaDeAhorro';
import { MetadeahorroService } from '../../../services/metadeahorro.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { VerDetalleDialogoComponent } from '../ver-detalle-dialogo/ver-detalle-dialogo.component';
import { TransaccionService } from '../../../services/transaccion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ShowdialogValidacionComponent } from '../showdialog-validacion/showdialog-validacion.component';
@Component({
  selector: 'app-listar-metadeahorro',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButton,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    NgIf,
    NgFor,
    ConfirmDialogComponent,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSort,
    MatSortModule
  ],
  templateUrl: './listar-metadeahorro.component.html',
  styleUrl: './listar-metadeahorro.component.css',
})
export class ListarMetadeahorroComponent implements OnInit {
  datasource: MatTableDataSource<MetaDeAhorro> = new MatTableDataSource();
  originaldata: MetaDeAhorro[]=[];
  obs?: Observable<any>;
  usuariologeado: Usuario= new Usuario()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MetadeahorroService, private dialog: MatDialog,
              private snackBar:MatSnackBar, private ls: LoginService,
              private tS: TransaccionService, private uS: UsuarioService
  ) {}

  mensaje: string='';

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { entityName: 'Meta de ahorro' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminar(id);
      }
    });
  }
  
  openDetailDialog(element:MetaDeAhorro):void{
    this.dialog.open(VerDetalleDialogoComponent,{data:element});
  }

  openValidacionDialog(){
    this.dialog.open(ShowdialogValidacionComponent)
  }


  ngOnInit(): void {
    this.usuariologeado= this.ls.getCurrentUser()!;
    this.SetAhorroAcumulado();
    if(this.usuariologeado && this.usuariologeado.usuario_id){
      this.mS.listarporusuarioactivo(this.usuariologeado.usuario_id).subscribe(data=>{
        this.datasource.data=data;
        this.datasource.paginator=this.paginator;
        this.obs=this.datasource.connect();
      });
      this.mS.getListaCambio().subscribe(data=>{
        this.datasource.data=data;
        this.datasource.paginator=this.paginator;
        this.obs=this.datasource.connect();
      });
    }
  }

  eliminar(id: number) {
    this.mS.eliminar(id).subscribe(() => {
      this.usuariologeado=this.ls.getCurrentUser()!;
      if(this.usuariologeado && this.usuariologeado.usuario_id){
        this.mS.listarporusuarioactivo(this.usuariologeado.usuario_id).subscribe((data)=>{
          this.mS.setListaCambio(data);
          this.mensaje='Meta de Ahorro eliminada correctamente';
          this.snackBar.open(this.mensaje,'Cerrar',{duration:2000});
        });
      }
    });
  }

  marcarComoCumplida(element: MetaDeAhorro) {
    this.SetAhorroAcumulado();
    console.log(element.monto_objetivo , this.usuariologeado.ahorro_acumulado)
    if(element.meta_cumplida || element.monto_objetivo < this.usuariologeado.ahorro_acumulado){
      
      element.meta_cumplida = !element.meta_cumplida; // Alterna el estado de la meta
      this.mS.modificar(element).subscribe(() => {
        this.mensaje = `Meta de Ahorro marcada como ${element.meta_cumplida ? 'cumplida' : 'no cumplida'}`;
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
        this.actualizarDatos();
        this.SetAhorroAcumulado();
      });
    } else this.openValidacionDialog();
    
  }

  actualizarDatos() {
    
    this.usuariologeado = this.ls.getCurrentUser()!;
    if (this.usuariologeado && this.usuariologeado.usuario_id) {
      this.mS.listarporusuarioactivo(this.usuariologeado.usuario_id).subscribe(data => {
        this.datasource.data = data;
        this.datasource.paginator = this.paginator;
        this.obs = this.datasource.connect();
      });
      
    }
  }

  SetAhorroAcumulado(){
    this.tS.getAhorroAcumulado(this.usuariologeado.usuario_id).subscribe((data) => {
      this.usuariologeado.ahorro_acumulado = data;
      this.uS.update(this.usuariologeado)
    });
    
  }
}
