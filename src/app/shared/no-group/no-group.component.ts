import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-no-group",
  templateUrl: "./no-group.component.html",
  styleUrls: ["./no-group.component.scss"]
})
export class NoGroupComponent implements OnInit {
  @Input() group;
  @Input() loading: boolean = false;
  constructor() {}

  ngOnInit() {}
}
