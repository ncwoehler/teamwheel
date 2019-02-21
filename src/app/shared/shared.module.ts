import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewGroupButtonComponent } from "./new-group-button/new-group-button.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { GroupRowItemComponent } from "./group-row-item/group-row-item.component";
import { MissingDataTextComponent } from "./missing-data-text/missing-data-text.component";
import { MemberComponent } from "./member/member.component";
import { MembersComponent } from "./members/members.component";

const routes: Routes = [];

@NgModule({
  declarations: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent
  ],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent
  ]
})
export class SharedModule {}
