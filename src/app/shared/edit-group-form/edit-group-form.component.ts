import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Group } from "../../domain/Group";
import { Member } from "../../domain/Member";

@Component({
  selector: "app-edit-group-form",
  templateUrl: "./edit-group-form.component.html",
  styleUrls: ["./edit-group-form.component.scss"]
})
export class EditGroupFormComponent implements OnInit {
  @Input() groupInput: Group;
  @Input() buttonText: string;
  @Output() submitted: EventEmitter<Group> = new EventEmitter();
  groupForm;
  newMemberName: string;

  @ViewChild("memberInput") inputEl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.info("Init form:" + this.groupInput);
    if (this.groupInput) {
      this.groupForm = this.fb.group({
        name: [this.groupInput.name, Validators.required],
        members: this.fb.array(
          this.groupInput.members.map(member =>
            this.fb.control(member.name, Validators.required)
          ),
          Validators.minLength(1)
        )
      });
    } else {
      this.groupForm = this.fb.group({
        name: ["", Validators.required],
        members: this.fb.array([], Validators.minLength(1))
      });
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
    this.members.push(this.fb.control(this.newMemberName, Validators.required));
    this.newMemberName = "";
    this.inputEl.setFocus();
  }

  removeMember(name: string) {
    const index = this.members.controls.findIndex(c => c.value === name);
    console.info("remove " + index);
    this.members.removeAt(index);
  }

  onSubmit() {
    this.submitted.emit(
      new Group(
        null,
        this.groupForm.value.name,
        this.members.controls.map(c => new Member(c.value))
      )
    );
  }
}
