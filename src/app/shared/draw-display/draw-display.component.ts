import { Component, Input, OnInit } from "@angular/core";
import { Draw } from "../../domain/Draw";
import { Group } from "../../domain/Group";
import { GroupService } from "../../services/group.service";

@Component({
  selector: "app-draw-display",
  templateUrl: "./draw-display.component.html",
  styleUrls: ["./draw-display.component.scss"]
})
export class DrawDisplayComponent implements OnInit {
  @Input() draw: Draw;
  @Input() allowEdit: boolean = false;
  @Input() allowReorder: boolean = false;

  group: Group;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService
      .getGroupById(this.draw.groupId)
      .then(group => (this.group = group))
      .catch(e => console.error(e)); // TODO error handling
  }

  setDrawName(drawName: string) {
    this.draw.name = drawName;
  }
}
