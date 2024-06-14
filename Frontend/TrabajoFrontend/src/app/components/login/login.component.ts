import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/JwtRequest';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar //para las ventanas emergentes
  ) {}

  hide = true;
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}
