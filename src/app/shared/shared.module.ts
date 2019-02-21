import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewGroupButtonComponent } from "./new-group-button/new-group-button.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { GroupRowItemComponent } from "./group-row-item/group-row-item.component";
import { MissingDataTextComponent } from "./missing-data-text/missing-data-text.component";
import { MemberComponent } from "./member/member.component";
import { MembersComponent } from "./members/members.component";
import { EditGroupFormComponent } from "./edit-group-form/edit-group-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [];

@NgModule({
  declarations: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent,
    EditGroupFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NewGroupButtonComponent,
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent,
    EditGroupFormComponent
  ]
})
export class SharedModule {}
