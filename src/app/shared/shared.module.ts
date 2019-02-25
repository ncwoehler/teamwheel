import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { GroupRowItemComponent } from "./group-row-item/group-row-item.component";
import { MissingDataTextComponent } from "./missing-data-text/missing-data-text.component";
import { MemberComponent } from "./member/member.component";
import { MembersComponent } from "./members/members.component";
import { FormsModule } from "@angular/forms";
import { TeamCardComponent } from "./team-card/team-card.component";
import { CardHeaderTitleComponent } from "./card-header-title/card-header-title.component";

const routes: Routes = [];

@NgModule({
  declarations: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent,
    TeamCardComponent,
    CardHeaderTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    MembersComponent,
    TeamCardComponent,
    CardHeaderTitleComponent
  ]
})
export class SharedModule {}
