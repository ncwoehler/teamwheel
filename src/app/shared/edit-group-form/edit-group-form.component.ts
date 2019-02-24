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
  @Input() content: ViewChild;
  @Output() submitted: EventEmitter<Group> = new EventEmitter();

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    let nameValue = "";
    let iconValue = "people";
    let membersValue = [];
    if (this.groupInput) {
      nameValue = this.groupInput.name;
      iconValue = this.groupInput.icon;
      membersValue = this.groupInput.members || [];
    }
    this.groupForm = this.fb.group({
      name: [nameValue, Validators.required],
      icon: [iconValue],
      members: this.fb.array(
        membersValue.map(member =>
          this.fb.control(member.name, Validators.required)
        ),
        Validators.minLength(1)
      )
    });
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
      let dimensions = this.content.getContentDimensions();
      this.content.scrollTo(0, dimensions.scrollBottom, 0);
    }
  }

  removeMember(name: string) {
    const index = this.members.controls.findIndex(c => c.value === name);
    this.members.removeAt(index);
  }

  onSubmit() {
    this.submitted.emit(
      new Group(
        null,
        this.groupForm.value.name,
        this.groupForm.value.icon,
        this.members.controls.map(c => new Member(c.value))
      )
    );
  }
}
