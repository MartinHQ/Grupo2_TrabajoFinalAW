import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CuentaBancaria } from '../../../models/CuentaBancaria';
import { CuentabancariaService } from '../../../services/cuentabancaria.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditar-cuentabancaria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './creaeditar-cuentabancaria.component.html',
  styleUrl: './creaeditar-cuentabancaria.component.css',
})
export class CreaeditarCuentabancariaComponent implements OnInit {
  constructor(
    private cbS: CuentabancariaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  form: FormGroup = new FormGroup({});
  cuentabancaria: CuentaBancaria = new CuentaBancaria();
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Usuario[] = [];

  bancos: { value: string; viewValue: string }[] = [
    { value: 'BBVA', viewValue: 'BBVA' },
    { value: 'BCP', viewValue: 'BCP' },
    { value: 'Interbank', viewValue: 'Interbank' },
    { value: 'Scotiabank', viewValue: 'Scotiabank' },
  ];

  ngOnInit(): void {
    //metodo para ediciones
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    //para el registro
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      numerocuenta: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ],
      ],
      tipo: ['', Validators.required],
      usuarioid: ['', Validators.required],
    });
    //para llenar la lista con los usuarios registrados
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cuentabancaria.cuentabancaria_id = this.form.value.codigo;
      this.cuentabancaria.nombre_banco = this.form.value.nombre;
      this.cuentabancaria.numero_cuenta = this.form.value.numerocuenta;
      this.cuentabancaria.tipo = this.form.value.tipo;
      this.cuentabancaria.usuario_id.usuario_id = this.form.value.usuarioid;

      if (this.edicion) {
        this.cbS.modificar(this.cuentabancaria).subscribe(() => {
          this.cbS.listar().subscribe((data) => {
            this.cbS.setListaCambio(data);
          });
        });
      } else {
        this.cbS.registrar(this.cuentabancaria).subscribe(() => {
          this.cbS.listar().subscribe((data) => {
            this.cbS.setListaCambio(data);
          });
        });
      }

      this.router.navigate(['cuentabancaria']);
    }
  }
  init(): void {
    if (this.edicion) {
      this.cbS.listarId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.cuentabancaria_id),
          nombre: new FormControl(data.nombre_banco),
          numerocuenta: new FormControl(data.numero_cuenta),
          tipo: new FormControl(data.tipo ? 'true' : 'false'),
          usuarioid: new FormControl(data.usuario_id.usuario_id),
        });
      });
    }
  }
}
