import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { Transaccion } from '../../../models/Transaccion';
import { TransaccionService } from '../../../services/transaccion.service';
import { CategoriaTranx } from '../../../models/CategoriaTranx';
import { CategoriatranxService } from '../../../services/categoriatranx.service';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {MatCardModule} from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-creareditar-transaccion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatCalendar
    
    
    
  ],
  templateUrl: './creareditar-transaccion.component.html',
  styleUrl: './creareditar-transaccion.component.css',
})
export class CreareditarTransaccionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  transaccion: Transaccion = new Transaccion();
  listaCategorias: CategoriaTranx[] = [];
  listaUsuarios: Usuario[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private ctS: CategoriatranxService,
    private uS: UsuarioService,
    private router: Router,
    private formbuilder: FormBuilder,
    private tS: TransaccionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] !=null;
      this.Init();
    });

    this.form = this.formbuilder.group({
      idTransaccion: [''],
      nombreTransaccion: ['', Validators.required],
      montoTransaccion: ['', [Validators.required, Validators.min(1)]],
      fechaTransaccion: ['', Validators.required],
      es_ingresoTransaccion: ['', Validators.required],
      usuario_id: ['', Validators.required],
      categoria_id: ['', Validators.required],
    });

    this.ctS.listar().subscribe((data) => {
      this.listaCategorias = data;
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.transaccion.idTransaccion = this.form.value.idTransaccion;
      this.transaccion.nombreTransaccion = this.form.value.nombreTransaccion;
      this.transaccion.montoTransaccion = this.form.value.montoTransaccion;
      this.transaccion.fechaTransaccion = this.form.value.fechaTransaccion;
      this.transaccion.es_ingresoTransaccion = this.form.value.es_ingresoTransaccion === 'true';
      this.transaccion.usuario_id.usuario_id = this.form.value.usuario_id; //de momento se registra el usuario manualmente hasta tener security...
      this.transaccion.categoria_id.idCategoriatranx = this.form.value.categoria_id;
      this.transaccion.es_manual = true; // de momento todas se guardan como true hasta que se valide por tarjeta...

      if (this.edicion) {
        this.tS.update(this.transaccion).subscribe(() => {
          this.tS.listar().subscribe((data) => {
            this.tS.setListaCambio(data);
          });
        });
      } else {
        this.tS.registrar(this.transaccion).subscribe((data) => {
          this.tS.listar().subscribe((data) => {
            this.tS.setListaCambio(data);
          });
        });
      }

      this.router.navigate(['transaccion']);
    }
  }

  Init(): void {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          idTransaccion: data.idTransaccion,
          nombreTransaccion: data.nombreTransaccion,
          montoTransaccion: data.montoTransaccion,
          fechaTransaccion: data.fechaTransaccion,
          es_ingresoTransaccion: data.es_ingresoTransaccion ? 'true' : 'false',
          usuario_id: data.usuario_id.usuario_id,
          categoria_id: data.categoria_id.idCategoriatranx,
        });
      });
    }
  }
}