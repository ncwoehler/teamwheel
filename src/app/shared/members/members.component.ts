import {Component, Input, OnInit} from "@angular/core";
import { Member } from "../../domain/Member";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit {
  @Input() members: Member[];

  constructor() {}

  ngOnInit() {}
}
