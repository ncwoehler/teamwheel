import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { GroupRowItemComponent } from "./group-row-item/group-row-item.component";
import { MissingDataTextComponent } from "./missing-data-text/missing-data-text.component";
import { MemberComponent } from "./member/member.component";
import { FormsModule } from "@angular/forms";
import { TeamCardComponent } from "./team-card/team-card.component";
import { TranslateModule } from "@ngx-translate/core";
import { NoGroupComponent } from "./no-group/no-group.component";

const routes: Routes = [];

@NgModule({
  declarations: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    TeamCardComponent,
    NoGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    TeamCardComponent,
    NoGroupComponent
  ]
})
export class SharedModule {}
