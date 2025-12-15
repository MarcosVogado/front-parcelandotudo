import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaBoletoComponent } from './pages/consulta-boleto/consulta-boleto.component';
import { ConsultaVeicularComponent } from './pages/consulta-veicular/consulta-veicular.component';
import { DefaultNavigationComponent } from './pages/default-navigation/default-navigation.component';
import { SelectionDebitComponent } from './pages/selection-debit/selection-debit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultNavigationComponent
  },
  {
    path: 'consulta-boleto',
    component: ConsultaBoletoComponent
  },
  {
    path: 'consulta-veicular',
    component: ConsultaVeicularComponent
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

