import { Component, Input, OnInit } from "@angular/core";
import { Group } from "../../Group";

@Component({
  selector: "app-group-row-item",
  templateUrl: "./group-row-item.component.html",
  styleUrls: ["./group-row-item.component.scss"]
})
export class GroupRowItemComponent implements OnInit {
  @Input() group: Group;

  constructor() {}

  ngOnInit() {}
}
