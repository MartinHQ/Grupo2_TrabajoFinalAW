import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PreguntaFrecuente } from '../../../models/PreguntaFrecuente';
import { PreguntafrecuenteService } from '../../../services/preguntafrecuente.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registrar-preguntafrecuente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registrar-preguntafrecuente.component.html',
  styleUrl: './registrar-preguntafrecuente.component.css',
})
export class RegistrarPreguntafrecuenteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  preguntaFrecuente: PreguntaFrecuente = new PreguntaFrecuente();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private pfS: PreguntafrecuenteService,
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //para modificar un objeto preguntafrecuente
    //recibe el id enviado en el listar
    //se confirma que el componente va a modificar
    //y se carga los datos del formulario
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    //para validar los inputs
    this.form = this.formbuilder.group({
      codigo: [''],
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
    });
  }

  //para realizar el registro o modificacion con el boton
  aceptar(): void {
    if (this.form.valid) {
      this.preguntaFrecuente.idPreguntaFrecuente = this.form.value.codigo;
      this.preguntaFrecuente.preguntaPreguntaFrecuente =
        this.form.value.pregunta;
      this.preguntaFrecuente.respuestaAsociadaPreguntaFrecuente =
        this.form.value.respuesta;
    }
    if (this.edicion) {
      //usar el metodo de modificar
      this.pfS.modificar(this.preguntaFrecuente).subscribe((data)=>{
        this.pfS.listar().subscribe((data)=>{
          this.pfS.setListaCambio(data);
        });
      });
    } else {
      this.pfS.registrar(this.preguntaFrecuente).subscribe((data) => {
        this.pfS.listar().subscribe((data) => {
          this.pfS.setListaCambio(data);
        });
      });
    }
    this.router.navigate(['preguntafrecuente']);
  }

  //para cargar datos de un objeto en el formulario
  init() {
    if (this.edicion) {
      this.pfS.listarId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPreguntaFrecuente),
          pregunta: new FormControl(data.preguntaPreguntaFrecuente),
          respuesta: new FormControl(data.respuestaAsociadaPreguntaFrecuente),
        });
      });
    }
  }
}
