import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})
export class NewgroupPage {

    constructor(private fb: FormBuilder, private groupService: GroupService) { }

    newGroupForm = this.fb.group({
        name: ['', Validators.required],
        members: this.fb.array([
            this.fb.control('')
        ])
    });

    get members() {
        return this.newGroupForm.get('members') as FormArray;
    }

    addMember() {
        this.members.push(this.fb.control(''));
    }

    onSubmit() {
        this.groupService.addGroup(this.newGroupForm.value.name);
    }

}
