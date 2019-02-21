import { Component, OnInit } from "@angular/core";
import { Group } from "../../domain/Group";
import { GroupService } from "../../services/group.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Member } from "../../domain/Member";

@Component({
  selector: "app-edit-group",
  templateUrl: "./edit-group.page.html",
  styleUrls: ["./edit-group.page.scss"]
})
export class EditGroupPage implements OnInit {
  private group: Group;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    this.groupService
      .getGroupById(groupId)
      .then(value => (this.group = value))
      .catch(value => console.error(value)); // TODO error handling
  }

  handleSubmit(group: Group) {
    return this.groupService
      .updateGroup(this.group.id, group.name, group.icon, group.members)
      .then(g => this.openGroupPage(g.id))
      .catch(value => console.error(value)); // TODO error handling
  }

  openGroupPage(id: string) {
    this.navController.navigateRoot(["/groups", "details", id]);
  }
}
