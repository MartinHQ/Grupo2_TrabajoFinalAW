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
import { CategoriaTranx } from '../../../models/CategoriaTranx';
import { CategoriatranxService } from '../../../services/categoriatranx.service';


@Component({
  selector: 'app-creareditar-categoriatranx',
  standalone: true,
  imports: [MatFormFieldModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,],
  templateUrl: './creareditar-categoriatranx.component.html',
  styleUrl: './creareditar-categoriatranx.component.css'
})
export class CreareditarCategoriatranxComponent implements OnInit{
  form:FormGroup = new FormGroup({});
  categoriatx: CategoriaTranx = new CategoriaTranx();
  mensaje: string = '';
  edicion: boolean = false;
  id:number = 0;


  constructor(
    private Cts:CategoriatranxService,
    private router:Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=> {
        this.id = data['id'];
        this.edicion = data['id'] !=null;
        this.Init();
        
      });

      this.form = this.formbuilder.group({
        idCategoriatranx:[''],
        nombre:['', Validators.required],
        descripcion:['',Validators.required]

      });
  }


  aceptar():void{
    if(this.form.valid){
      this.categoriatx.idCategoriatranx = this.form.value.idCategoriatranx;
      this.categoriatx.nombre = this.form.value.nombre;
      this.categoriatx.descripcion = this.form.value.descripcion;


      if(this.edicion){
        this.Cts.update(this.categoriatx).subscribe(()=>{
          this.Cts.listar().subscribe((data)=>{
            this.Cts.setListaCambio(data);
          })
        });
      } else {
        this.Cts.registrar(this.categoriatx).subscribe((data)=>{
          this.Cts.listar().subscribe((data)=>{
            this.Cts.setListaCambio(data);
          });
        });
      }
      this.router.navigate(['categoriatranx']);
      this.edicion=false;
    }
  }


  Init(){
    if(this.edicion){
      this.Cts.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          idCategoriatranx: new FormControl(data.idCategoriatranx),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
  }


}
