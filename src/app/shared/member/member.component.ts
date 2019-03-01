import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Group } from "../../domain/Group";
import { Member } from "../../domain/Member";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"]
})
export class MemberComponent implements OnInit {
  @Input() member: Member;
  @Input() disabled: boolean = false;
  @Input() hasStart: boolean = false;

  constructor() {}

  ngOnInit() {}
}
