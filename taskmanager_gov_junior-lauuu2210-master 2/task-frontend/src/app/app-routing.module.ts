import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { MainComponent } from './main/main.component';
import { TrelloComponent } from './trello/trello.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'trello', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'add-task', component: AddTaskComponent },
      { path: 'trello', component: TrelloComponent },
      { path: 'view-task/:id', component: ViewTaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
