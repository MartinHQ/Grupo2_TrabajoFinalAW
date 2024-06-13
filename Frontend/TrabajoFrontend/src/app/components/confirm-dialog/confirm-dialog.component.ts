import { Component, Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButton, MatDialogModule, ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(public dialog:MatDialogRef<ConfirmDialogComponent>,
    //para reutilizar el dialog de confirmacion en otras entidades
    @Inject(MAT_DIALOG_DATA) public data:{entityName:string}
  ){}

  onNoClick():void{
    this.dialog.close();
  }

}
