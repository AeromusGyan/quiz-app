import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizesComponent } from './quizes/quizes.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [
    MainComponent,
    QuizesComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    QuizesComponent
  ]
})
export class MainModule { }
