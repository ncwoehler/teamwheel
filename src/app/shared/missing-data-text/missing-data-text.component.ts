import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-missing-data-text',
  templateUrl: './missing-data-text.component.html',
  styleUrls: ['./missing-data-text.component.scss']
})
export class MissingDataTextComponent implements OnInit {
  @Input() data;
  @Input() text;

  constructor() {}

  ngOnInit() {}
}
