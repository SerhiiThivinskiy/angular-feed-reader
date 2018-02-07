import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StatisticComponent } from './components/statistic/statistic.component';

const statisticRoutes: Routes = [
  { path: '', component: StatisticComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(statisticRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StatisticRoutingModule {
}
