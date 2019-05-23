import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {
  editMode = false;
  editValue: string;
  @Input() value: string;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  @ViewChild('editInput') inputEl;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  enterEditMode() {
    this.editValue = this.value;
    this.editMode = true;
    this.changeDetector.detectChanges();
    setTimeout(() => {
      this.inputEl.setFocus();
    }, 50);
  }

  saveValue() {
    this.valueChanged.emit(this.editValue);
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
