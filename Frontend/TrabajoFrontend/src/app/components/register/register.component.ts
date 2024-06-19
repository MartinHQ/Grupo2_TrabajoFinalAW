import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Usuario } from '../../models/Usuario';
import { Rol } from '../../models/Rol';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  rolCliente: Rol = new Rol();
  hoy: Date = new Date();

  constructor(private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}
  
  hide = true;
  

  
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  ngOnInit(): void {   
    this.form = this.formBuilder.group({
    codigo: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(12), Validators.max(100),Validators.pattern('^[0-9]*$')]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
    })
  }

  registrarse(): void{
    this.rolCliente.idRol = 2;
    this.rolCliente.nombreRol = 'CLIENTE';

    if(this.form.valid){
      this.usuario.usuario_id = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.edad = this.form.value.edad;
      this.usuario.correo = this.form.value.correo;
      this.usuario.contrasenia = this.form.value.password;
      this.usuario.fecha_registro = this.hoy;
      this.usuario.ahorro_acumulado = 0;
      this.usuario.rol_id = this.rolCliente;
      console.log(this.usuario)
      this.uS.insert(this.usuario).subscribe()
    }
    this.toLogin()
  }

  toLogin(): void{
    this.router.navigate(['/login'])
  }
}
