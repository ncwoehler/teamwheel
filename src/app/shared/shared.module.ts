import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewGroupButtonComponent } from "./new-group-button/new-group-button.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [];

@NgModule({
  declarations: [NewGroupButtonComponent],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [NewGroupButtonComponent]
})
export class SharedModule {}
