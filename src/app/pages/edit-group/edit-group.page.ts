import { Component, OnInit, ViewChild } from "@angular/core";
import { Group } from "../../domain/Group";
import { GroupService } from "../../services/group.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Member } from "../../domain/Member";

@Component({
  selector: "app-edit-group",
  templateUrl: "./edit-group.page.html",
  styleUrls: ["./edit-group.page.scss"]
})
export class EditGroupPage implements OnInit {
  groupId;
  groupForm;
  newMemberName: string;

  iconOptions: string[] = [
    "people",
    "bonfire",
    "contacts",
    "heart",
    "paw",
    "rainy",
    "rocket",
    "ribbon",
    "flask",
    "book"
  ];

  @ViewChild("memberInput") inputEl;
  @ViewChild("content") content;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private navController: NavController,
    private fb: FormBuilder
  ) {
    this.groupForm = this.fb.group({
      name: ["", Validators.required],
      icon: ["people"],
      members: this.fb.array([], Validators.minLength(1))
    });
  }

  ngOnInit() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    if (groupId) {
      this.getGroup(groupId).then(group => this.setupGroupFormParams(group));
      this.groupId = groupId;
    }
  }

  async getGroup(groupId: string): Promise<Group> {
    return await this.groupService.getGroupById(groupId);
  }

  setupGroupFormParams(group: Group) {
    if (group) {
      this.groupForm.patchValue(group);
      const membersValue = group.members || [];
      membersValue
        .map(member => this.fb.control(member.name, Validators.required))
        .forEach(m => this.members.push(m));
    }
  }

  get members(): FormArray {
    return this.groupForm.get("members") as FormArray;
  }

  addMemberValid() {
    return (
      this.newMemberName &&
      this.newMemberName.length > 0 &&
      this.members.controls.findIndex(c => c.value === this.newMemberName) < 0
    );
  }

  addMember() {
    if (!this.addMemberValid()) {
      return;
    }
    this.members.push(this.fb.control(this.newMemberName, Validators.required));
    this.newMemberName = "";
    this.inputEl.setFocus();
    if (this.content) {
      this.content.scrollToBottom();
    }
  }

  async removeMember(name: string) {
    const index = this.members.controls.findIndex(c => c.value === name);
    this.members.removeAt(index);
  }

  onSubmit() {
    const newMembers = this.members.controls.map(c => new Member(c.value));
    if (this.groupId) {
      this.groupService
        .updateGroup(
          this.groupId,
          this.groupForm.value.name,
          this.groupForm.value.icon,
          newMembers
        )
        .then(g => this.openGroupPage(g.id))
        .catch(value => console.error(value)); // TODO error handling
    } else {
      this.groupService
        .addGroup(
          this.groupForm.value.name,
          this.groupForm.value.icon,
          newMembers
        )
        .then(g => this.openGroupPage(g.id))
        .catch(value => console.error(value)); // TODO error handling
    }
  }

  openGroupPage(id: string) {
    if (this.groupId) {
      this.navController.navigateBack(["groups", id]);
    } else {
      this.navController.navigateRoot(["groups", id], {
        animated: true
      });
    }
  }

  reorder($event) {
    const movedMember = this.members.at($event.detail.from);
    this.members.removeAt($event.detail.from);
    this.members.insert($event.detail.to, movedMember);
    $event.detail.complete();
  }
}
