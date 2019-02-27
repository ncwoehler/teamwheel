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
    path: "settings",
    loadChildren: "./pages/settings/settings.module#SettingsPageModule"
  },
  {
    path: "groups/new",
    loadChildren: "./pages/groups/edit/edit-group.module#EditGroupPageModule"
  },
  {
    path: "groups/all",
    loadChildren: "./pages/groups/all/all-groups.module#AllGroupsPageModule"
  },
  {
    path: "groups/:groupId",
    loadChildren:
      "./pages/groups/detail/group-detail.module#GroupDetailPageModule"
  },
  {
    path: "groups/:groupId/edit",
    loadChildren: "./pages/groups/edit/edit-group.module#EditGroupPageModule"
  },
  {
    path: "groups/:groupId/draw",
    loadChildren: "./pages/groups/draw/new-team.module#NewTeamPageModule"
  },
  {
    path: "draws/preview",
    loadChildren:
      "./pages/draws/preview/team-created.module#TeamCreatedPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
