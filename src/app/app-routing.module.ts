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
    loadChildren: "./pages/home/home.module#HomePageModule"
  },
  {
    path: "groups/new",
    loadChildren: "./pages/new-group/new-group.module#NewGroupPageModule"
  },
  {
    path: "groups/all",
    loadChildren: "./pages/all-groups/all-groups.module#AllGroupsPageModule"
  },
  {
    path: "groups/details/:groupId",
    loadChildren:
      "./pages/group-detail/group-detail.module#GroupDetailPageModule"
  },
  {
    path: "groups/edit/:groupId",
    loadChildren: "./pages/edit-group/edit-group.module#EditGroupPageModule"
  },
  {
    path: "settings",
    loadChildren: "./pages/settings/settings.module#SettingsPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
