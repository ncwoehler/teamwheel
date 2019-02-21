import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: "groups/new",
    loadChildren: "./new-group/new-group.module#NewGroupPageModule"
  },
  {
    path: "groups/all",
    loadChildren: "./all-groups/all-groups.module#AllGroupsPageModule"
  },
  {
    path: "groups/details/:groupId",
    loadChildren: "./group-detail/group-detail.module#GroupDetailPageModule"
  },
  {
    path: "groups/edit/:groupId",
    loadChildren: "./edit-group/edit-group.module#EditGroupPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
