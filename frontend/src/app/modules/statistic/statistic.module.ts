import { NgModule } from '@angular/core';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { StatisticRoutingModule } from './statistic-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    SharedModule,
    StatisticRoutingModule
  ],
  declarations: [
    StatisticComponent,
    ChartComponent
  ]
})
export class StatisticModule {
}
