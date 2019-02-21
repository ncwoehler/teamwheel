import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewGroupButtonComponent } from "./new-group-button/new-group-button.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { GroupRowItemComponent } from "./group-row-item/group-row-item.component";
import { MissingDataTextComponent } from "./missing-data-text/missing-data-text.component";

const routes: Routes = [];

@NgModule({
  declarations: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent
  ],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent
  ]
})
export class SharedModule {}
