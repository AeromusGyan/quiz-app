import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { QuizesComponent } from './main/quizes/quizes.component';
import { ResultComponent } from './main/result/result.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'quizes',component:QuizesComponent},
  {path:'result',component:ResultComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
