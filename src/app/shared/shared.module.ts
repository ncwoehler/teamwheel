import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
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
import { InlineEditComponent } from "./inline-edit/inline-edit.component";
import { DrawDisplayComponent } from "./draw-display/draw-display.component";
import { FixedWidthGridComponent } from "./fixed-width-grid/fixed-width-grid.component";
import { TeamCardMemberActionsComponent } from "./team-card-member-actions/team-card-member-actions.component";
import { AvatarModule } from "ngx-avatar";
import { ImageResizer } from "@ionic-native/image-resizer/ngx";
import { Ng2ImgMaxModule } from "ng2-img-max";

const routes: Routes = [];

@NgModule({
  declarations: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    TeamCardComponent,
    NoGroupComponent,
    InlineEditComponent,
    DrawDisplayComponent,
    FixedWidthGridComponent,
    TeamCardMemberActionsComponent
  ],
  entryComponents: [TeamCardMemberActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2ImgMaxModule,
    AvatarModule.forRoot(),
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports: [
    GroupRowItemComponent,
    MissingDataTextComponent,
    MemberComponent,
    TeamCardComponent,
    NoGroupComponent,
    InlineEditComponent,
    DrawDisplayComponent,
    FixedWidthGridComponent
  ],
  providers: [ImageResizer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
