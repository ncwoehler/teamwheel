import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { GroupService } from "../group.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Member } from "../Member";

@Component({
  selector: "app-newgroup",
  templateUrl: "./new-group-page.component.html",
  styleUrls: ["./new-group-page.component.scss"]
})
export class NewGroupPage {
  newGroupForm;
  newMemberName: string;

  @ViewChild("memberInput") inputEl;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private navController: NavController
  ) {
    this.newGroupForm = this.fb.group({
      name: ["", Validators.required],
      members: this.fb.array([], Validators.minLength(1))
    });
  }

  onSubmit() {
    return this.groupService
      .addGroup(
        this.newGroupForm.value.name,
        this.members.controls.map(c => new Member(c.value))
      )
      .then(g => this.openGroupPage(g.id))
      .catch(value => console.error(value)); // TODO error handling
  }

  openGroupPage(id: string) {
    this.navController.navigateRoot(["/groups", "details", id]);
  }

  get members(): FormArray {
    return this.newGroupForm.get("members") as FormArray;
  }

  addMemberValid() {
    return this.newMemberName && this.newMemberName.length > 0;
  }

  addMember() {
    this.members.push(
      this.fb.control(this.newMemberName, Validators.required)
    );
    this.newMemberName = "";
    this.inputEl.setFocus();
  }
}
