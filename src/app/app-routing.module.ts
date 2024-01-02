import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, ExtraOptions } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LoginGuard } from './guard/login.guard';
import { EstudiantesGuard } from './guard/estudiantes.guard';

const routes: Routes = [
  {
    path : 'inicio',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'preguntas',
    component: QuestionsComponent,
    canActivate: [EstudiantesGuard]
  },
  {
    path: '**',
    redirectTo : 'inicio'
  }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
