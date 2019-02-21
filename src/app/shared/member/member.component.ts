import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Group } from "../../domain/Group";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"]
})
export class MemberComponent implements OnInit {
  @Input() name: string;
  @Input() showDelete: boolean = false;
  @Output() delete: EventEmitter<Group> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  triggerDeleteEvent() {
    if (this.showDelete) {
      this.delete.emit(null);
    }
  }
}
