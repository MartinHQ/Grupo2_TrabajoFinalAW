import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { TipoMeta } from '../../../models/TipoMeta';
import { TipometaService } from '../../../services/tipometa.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creareditar-tipometa',
  standalone: true,
  imports: [MatFormFieldModule,CommonModule,NgIf, MatButtonModule,MatInputModule,ReactiveFormsModule,
    RouterLink],
  templateUrl: './creareditar-tipometa.component.html',
  styleUrl: './creareditar-tipometa.component.css'
})
export class CreareditarTipometaComponent implements OnInit{
  form:FormGroup = new FormGroup({});
  tipometa: TipoMeta = new TipoMeta()
  mensaje: string = '';
  edicion: boolean = false;
  id:number = 0;

  constructor(
    private tmS:TipometaService,
    private router:Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=> {
      this.id = data['id'];
      this.edicion = data['id'] !=null;
      this.init();
      
    });

    this.form = this.formbuilder.group({
      codigo:[''],
      nombre:['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipometa.idTipoMeta = this.form.value.codigo;
      this.tipometa.nombre= this.form.value.nombre
    
    if (this.edicion) {
      //usar el metodo de modificar
      this.tmS.modificar(this.tipometa).subscribe((data)=>{
        this.tmS.listar().subscribe((data)=>{
          this.tmS.setListaCambio(data);
        });
      });
    } else {
      this.tmS.registrar(this.tipometa).subscribe((data) => {
        this.tmS.listar().subscribe((data) => {
          this.tmS.setListaCambio(data);
        });
      });
    }
    this.router.navigate(['tipometa']);
  }
  }
  //para cargar datos de un objeto en el formulario
  init() {
    if (this.edicion) {
      this.tmS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTipoMeta),
          nombre: new FormControl(data.nombre),
        });
      });
    }
  }


}
