import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/transaccion.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-categoriaspopulares',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './categoriaspopulares.component.html',
  styleUrl: './categoriaspopulares.component.css',
})
export class CategoriaspopularesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];

  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TransaccionService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.tS.getCategoriasPopulares().subscribe((data) => {
      console.log('query' , data);
      this.barChartLabels = data.map((item) => item.categoria);
      this.barChartData = [
        {
          data: data.map((item) => item.total_transacciones),
          label: 'transacciones con esta categoria',
          backgroundColor: [
            'rgba(41, 37, 243, 0.6)',  // Azul principal pastel
            'rgba(41, 127, 243, 0.6)', // Variación de azul pastel
            'rgba(37, 243, 229, 0.6)', // Variación de azul verdoso pastel
            'rgba(116, 37, 243, 0.6)', // Variación de púrpura pastel
            'rgba(41, 37, 153, 0.6)'   // Variación de azul oscuro pastel
          ],
        },
      ];
      this.cdr.detectChanges();
    });
  }
}
