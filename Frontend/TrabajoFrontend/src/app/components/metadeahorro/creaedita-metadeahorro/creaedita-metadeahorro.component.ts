import { Component, OnInit } from '@angular/core';
import { MetaDeAhorro } from '../../../models/MetaDeAhorro';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoMeta } from '../../../models/TipoMeta';
import { Usuario } from '../../../models/Usuario';
import { TipometaService } from '../../../services/tipometa.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MetadeahorroService } from '../../../services/metadeahorro.service';
import { ActivatedRoute, RouterLink, Router, Params } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-creaedita-metadeahorro',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    NgFor,
    MatCalendar,
    MatCardModule,
    CommonModule, 
  ],
  templateUrl: './creaedita-metadeahorro.component.html',
  styleUrl: './creaedita-metadeahorro.component.css',
})
export class CreaeditaMetadeahorroComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  metaahorro: MetaDeAhorro = new MetaDeAhorro();
  listatipoMeta: TipoMeta[] = [];
  listaUsuarios: Usuario[] = [];
  edicion: boolean = false;
  id: number = 0;
  usuariologeado: Usuario | null =null;
  constructor(
    private mtS: TipometaService,
    private uS: UsuarioService, 
    private router: Router,
    private formbuilder: FormBuilder,
    private maS: MetadeahorroService,
    private route: ActivatedRoute,
    private lS: LoginService,
   
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.Init();
      
    });

    this.form = this.formbuilder.group({
      codigo: ['',],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      fecha: ['', Validators.required],
      tipometaid: ['', Validators.required],
    });

    this.mtS.listar().subscribe((data) => {
      this.listatipoMeta = data;
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    this.usuariologeado=this.lS.getCurrentUser()!;
    if (this.form.valid) {
      this.metaahorro.metadeahorro = this.form.value.codigo;
      this.metaahorro.titulo_meta = this.form.value.nombre;
      this.metaahorro.descripcion = this.form.value.descripcion;
      this.metaahorro.monto_objetivo = this.form.value.monto;
      this.metaahorro.fecha_limite = this.form.value.fecha; 
      if(this.usuariologeado){
        this.metaahorro.usuario_id=this.usuariologeado;
      }
      this.metaahorro.tipo_meta_id.idTipoMeta = this.form.value.tipometaid;
      if (this.edicion) {
        this.maS.modificar(this.metaahorro).subscribe(() => {
          if(this.usuariologeado){
            this.maS.listarporusuarioactivo(this.usuariologeado.usuario_id).subscribe((data)=>{
              this.maS.setListaCambio(data);
            });
          }
          
        });
      } else {
        this.maS.registrar(this.metaahorro).subscribe((data) => {
         if(this.usuariologeado){
          this.maS.listarporusuarioactivo(this.usuariologeado.usuario_id).subscribe((data)=>{
            this.maS.setListaCambio(data);
          });
         }
        });
      }

      this.router.navigate(['metadeahorro']);
    }
  }
  Init(): void {
    if (this.edicion) {
      this.maS.listarId(this.id).subscribe((data) => {
        this.form.setValue({
          codigo: data.metadeahorro,
          nombre: data.titulo_meta,
          descripcion: data.descripcion,
          monto: data.monto_objetivo,
          fecha: data.fecha_limite,
          meta:  data.meta_cumplida ? 'true' : 'false',
          tipometaid: data.tipo_meta_id.idTipoMeta,
        });
      });
    }
  }
}
