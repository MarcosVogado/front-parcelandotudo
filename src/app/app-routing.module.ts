import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaBoletoComponent } from './pages/consulta-boleto/consulta-boleto.component';
import { ConsultaVeicularComponent } from './pages/consulta-veicular/consulta-veicular.component';
import { DefaultNavigationComponent } from './pages/default-navigation/default-navigation.component';
import { SelectionPageComponent } from './pages/selection-page/selection-page.component';

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
    path: 'selection-page',
    component: SelectionPageComponent
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
