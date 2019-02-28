import { Component, Input, OnInit } from "@angular/core";
import { Draw } from "../../domain/Draw";

@Component({
  selector: "app-draw-display",
  templateUrl: "./draw-display.component.html",
  styleUrls: ["./draw-display.component.scss"]
})
export class DrawDisplayComponent implements OnInit {
  @Input() draw: Draw;
  @Input() allowEdit: boolean = false;

  constructor() {}

  ngOnInit() {}

  setDrawName(drawName: string) {
    this.draw.name = drawName;
  }
}
