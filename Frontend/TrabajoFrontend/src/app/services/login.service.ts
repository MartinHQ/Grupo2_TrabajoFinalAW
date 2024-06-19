import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtRequest } from '../models/JwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/Usuario';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioLogeado : Usuario = new Usuario();

  constructor(private http: HttpClient,
    private uS: UsuarioService
  ) { }

  login(request: JwtRequest) {
    return this.http.post(`${base_url}/login`, request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // console.log('Decoded Token:', decodedToken); // Log para ver el contenido del token decodificado
    return decodedToken?.role;
  }

  getCurrentUser(): Usuario {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return this.usuarioLogeado;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const correoUsuario = decodedToken.sub;

    this.uS.findbyCorreo(correoUsuario).subscribe((data: any) => {
      this.usuarioLogeado = data;
    });

    return this.usuarioLogeado;

  }
}
