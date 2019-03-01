import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Member } from "../../domain/Member";
import { Base64 } from "@ionic-native/base64/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"]
})
export class MemberComponent implements OnInit {
  @Input() member: Member;
  @Input() disabled: boolean = false;
  @Input() hasStart: boolean = false;
  @Input() editable: boolean = false;

  @ViewChild("imageInput") fileInput: ElementRef;

  constructor(private imagePicker: ImagePicker, private base64: Base64) {}

  ngOnInit() {}

  getAvatarImg() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker
      .getPictures(options)
      .then(results => {
        for (var i = 0; i < results.length; i++) {
          const firstResult = results[i];
          this.encodeBase64(firstResult);
        }
      })
      .catch(err => {
        // try opening the hidden file input via click
        this.fileInput.nativeElement.click();
      });
  }

  handleInputChange($event) {
    const file: File = $event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.member.avatar = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  private encodeBase64(result) {
    this.base64.encodeFile(result).then(
      (base64File: string) => {
        this.member.avatar = base64File;
      },
      err => {
        console.log(err); // TODO error handling
      }
    );
  }
}
