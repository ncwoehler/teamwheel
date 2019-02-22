import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TeamCreatedPage } from "./team-created.page";
import { SharedModule } from "../../../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: TeamCreatedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamCreatedPage]
})
export class TeamCreatedPageModule {}
