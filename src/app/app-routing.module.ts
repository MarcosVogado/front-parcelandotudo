import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillLookupComponent } from './pages/bill-lookup/bill-lookup.component';
import { VehicleDebtLookupComponent } from './pages/vehicle-debt-lookup/vehicle-debt-lookup.component';
import { DefaultNavigationComponent } from './pages/default-navigation/default-navigation.component';
import { SelectionDebitComponent } from './pages/selection-debit/selection-debit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultNavigationComponent
  },
  {
    path: 'consulta-boleto',
    component: BillLookupComponent
  },
  {
    path: 'consulta-veicular',
    component: VehicleDebtLookupComponent
  },
  {
    path: 'selection-debit',
    component: SelectionDebitComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
