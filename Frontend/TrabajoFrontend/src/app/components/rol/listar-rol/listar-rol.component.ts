import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/Rol';

@Component({
  selector: 'app-listar-rol',
  standalone: true,
  imports: [ MatPaginator, FormsModule, CommonModule, MatTableModule, MatButton, MatIconModule, RouterLink ],
  templateUrl: './listar-rol.component.html',
  styleUrl: './listar-rol.component.css'
})
export class ListarRolComponent implements OnInit {
  constructor(private rol : RolService) {}
  @ViewChild(MatPaginator) paginator ?: MatPaginator;
  ngOnInit(): void {
    this.rol.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
    this.rol.getListaCambio().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  displayedColums : string[] = ['id', 'nombre'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
}
