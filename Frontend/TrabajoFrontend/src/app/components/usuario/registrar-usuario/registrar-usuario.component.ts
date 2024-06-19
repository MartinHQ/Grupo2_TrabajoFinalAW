import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { Rol } from '../../../models/Rol';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    CommonModule,
    RouterLink
  ],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  hide = true;

  usuarioLogeado: Usuario = new Usuario();
  edicion: boolean = false;

  rolUsuario: Rol = new Rol()
  hoy: Date = new Date()

  constructor(private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lS: LoginService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.edicion = data['edit'] || false;
    });
    this.usuarioLogeado = this.lS.getCurrentUser()

    this.init();
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100),Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  registrar():void {
    this.rolUsuario.idRol = 1;
    this.rolUsuario.nombreRol = 'ADMIN';


    if(this.form.valid){
      this.usuario.usuario_id = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.edad = this.form.value.edad;
      this.usuario.correo = this.form.value.correo;
      this.usuario.contrasenia = this.form.value.password;
      if(this.edicion){
        this.usuario.fecha_registro = this.usuarioLogeado.fecha_registro;
        this.usuario.ahorro_acumulado = this.usuarioLogeado.ahorro_acumulado;
        this.usuario.rol_id = this.usuarioLogeado.rol_id;
        this.uS.update(this.usuario).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data)
          })
        })
      } else {
        this.usuario.fecha_registro = this.hoy;
        this.usuario.ahorro_acumulado = 0;
        this.usuario.rol_id = this.rolUsuario;
        this.uS.insert(this.usuario).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data)
          })
        })
      }
      this.router.navigate(['homes'])
    }
  }

  init(){
    if(this.edicion){
      this.uS.listId(this.usuarioLogeado.usuario_id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.usuario_id),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          edad: new FormControl(data.edad),
          correo: new FormControl(data.correo),
          password: new FormControl('12345')
        })
      })
    }
  }
}
