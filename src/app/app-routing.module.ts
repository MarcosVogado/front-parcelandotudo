import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultaVeicularComponent } from './pages/consulta-veicular/consulta-veicular.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'consulta-veicular',
    component: ConsultaVeicularComponent
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
