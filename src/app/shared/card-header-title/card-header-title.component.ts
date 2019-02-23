import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-card-header-title",
  templateUrl: "./card-header-title.component.html",
  styleUrls: ["./card-header-title.component.scss"]
})
export class CardHeaderTitleComponent implements OnInit {
  @Input() text: string;
  @Input() icon: string;
  constructor() {}

  ngOnInit() {}
}
