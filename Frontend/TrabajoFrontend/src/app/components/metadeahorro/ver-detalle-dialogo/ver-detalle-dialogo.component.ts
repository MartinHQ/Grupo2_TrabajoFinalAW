import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ver-detalle-dialogo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './ver-detalle-dialogo.component.html',
  styleUrl: './ver-detalle-dialogo.component.css'
})
export class VerDetalleDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<VerDetalleDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }


}
