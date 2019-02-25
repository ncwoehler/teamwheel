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
    loadChildren: "./pages/edit-group/edit-group.module#EditGroupPageModule"
  },
  {
    path: "groups/all",
    loadChildren: "./pages/all-groups/all-groups.module#AllGroupsPageModule"
  },
  {
    path: "groups/:groupId",
    loadChildren:
      "./pages/group-detail/group-detail.module#GroupDetailPageModule"
  },
  {
    path: "groups/:groupId/edit",
    loadChildren: "./pages/edit-group/edit-group.module#EditGroupPageModule"
  },
  {
    path: "groups/:groupId/draw",
    loadChildren: "./pages/teams/new-team/new-team.module#NewTeamPageModule"
  },
  {
    path: "draws/preview",
    loadChildren:
      "./pages/teams/team-created/team-created.module#TeamCreatedPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
