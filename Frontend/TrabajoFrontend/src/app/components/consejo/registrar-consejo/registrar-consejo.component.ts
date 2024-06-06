import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Consejo } from '../../../models/Consejo';
import { ConsejoService } from '../../../services/consejo.service';

@Component({
  selector: 'app-registrar-consejo',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    CommonModule
  ],
  templateUrl: './registrar-consejo.component.html',
  styleUrl: './registrar-consejo.component.css'
})
export class RegistrarConsejoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  consejo: Consejo = new Consejo();

  edit: boolean = false;
  id: number = 0;

  constructor(
    private CS: ConsejoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data['id'];
      this.edit = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  registrar(): void{
    if (this.form.valid){
      this.consejo.idConsejo = this.form.value.codigo;
      this.consejo.titulo = this.form.value.titulo;
      this.consejo.descripcion = this.form.value.descripcion;
      if(this.edit){
        this.CS.update(this.consejo).subscribe((data)=>{
          this.CS.list().subscribe((data)=>{
            this.CS.setList(data);
          })
        })
      } else{
        this.CS.insert(this.consejo).subscribe((data)=>{
          this.CS.list().subscribe((data)=>{
            this.CS.setList(data);
          })
        })
      }
      this.router.navigate(['consejos'])
    }
  }

  init(){
    if(this.edit){
      this.CS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.idConsejo),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
  }
}
