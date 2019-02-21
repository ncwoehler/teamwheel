import { Component } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { NavController } from "@ionic/angular";
import {Group} from "../../domain/Group";

@Component({
  selector: "app-newgroup",
  templateUrl: "./new-group-page.component.html",
  styleUrls: ["./new-group-page.component.scss"]
})
export class NewGroupPage {
  constructor(
    private groupService: GroupService,
    private navController: NavController
  ) {}

  handleSubmission(group: Group) {
    return this.groupService
      .addGroup(group.name, group.members)
      .then(g => this.openGroupPage(g.id))
      .catch(value => console.error(value)); // TODO error handling
  }

  openGroupPage(id: string) {
    this.navController.navigateRoot(["/groups", "details", id]);
  }
}
