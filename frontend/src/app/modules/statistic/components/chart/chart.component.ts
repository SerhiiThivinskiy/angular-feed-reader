import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input()
  chartLabels: Array<string>;
  @Input()
  chartData: Array<number>;
  @Input()
  chartType: string = 'pie';

  constructor() {
  }

  ngOnInit() {
  }

}
