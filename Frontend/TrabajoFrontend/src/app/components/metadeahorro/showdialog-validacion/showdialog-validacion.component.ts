import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-showdialog-validacion',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,CommonModule,MatDialogActions,MatDialogContent],
  templateUrl: './showdialog-validacion.component.html',
  styleUrl: './showdialog-validacion.component.css'
})
export class ShowdialogValidacionComponent {

  constructor(
    public dialogRef: MatDialogRef<ShowdialogValidacionComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
