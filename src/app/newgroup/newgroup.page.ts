import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GroupService } from "../group.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-newgroup",
  templateUrl: "./newgroup.page.html",
  styleUrls: ["./newgroup.page.scss"]
})
export class NewgroupPage {
  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router
  ) {}

  newGroupForm = this.fb.group({
    name: ["", Validators.required]
  });

  onSubmit() {
    let newGroup = this.groupService.addGroup(this.newGroupForm.value.name);
    newGroup.then(group => this.openGroupPage(group.id));
  }

  openGroupPage(id: string) {
    this.router.navigateByUrl(`/groups/details/${id}`);
  }
}
