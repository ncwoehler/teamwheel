import {Component, NgZone} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {GroupService} from "../group.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: "app-newgroup",
  templateUrl: "./new-group-page.component.html",
  styleUrls: ["./new-group-page.component.scss"]
})
export class NewGroupPage {
  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private navController: NavController
  ) {}

  newGroupForm = this.fb.group({
    name: ["", Validators.required]
  });

  onSubmit() {
      return this.groupService.addGroup(this.newGroupForm.value.name)
          .then(g => this.openGroupPage(g.id))
          .catch(value => console.error(value)); // TODO error handling
  }

  openGroupPage(id: string) {
    this.navController.navigateRoot(['/groups', 'details', id]);
  }
}
