import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Member } from "../../domain/Member";
import { Platform, ToastController } from "@ionic/angular";
import {
  ImageResizer,
  ImageResizerOptions
} from "@ionic-native/image-resizer/ngx";
import { Ng2ImgMaxService } from "ng2-img-max";

const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;

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

  avatarUpload: boolean = false;

  constructor(
    private toastController: ToastController,
    private imageResizer: ImageResizer,
    private ng2ImgMax: Ng2ImgMaxService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  triggerAvatarChange() {
    // try opening the hidden file input via click
    this.fileInput.nativeElement.click();
  }

  handleInputChange($event) {
    const file: File = $event.target.files[0];
    this.avatarUpload = true;
    if (this.platform.is("cordova")) {
      this.compressAndSetAvatarNative(file);
    } else {
      this.compressAndSetAvatarWeb(file);
    }
  }

  private async compressAndSetAvatarWeb(file: File) {
    this.ng2ImgMax.resizeImage(file, MAX_WIDTH, MAX_HEIGHT).subscribe(
      result => {
        const reader: FileReader = new FileReader();
        reader.onload = (ev: ProgressEvent) => {
          this.member.avatar = reader.result as string;
          this.avatarUpload = false;
        };
        reader.onerror = (ev: ProgressEvent) => {
          this.presentToast(ev);
        };
        reader.readAsDataURL(result);
      },
      error => {
        this.presentToast(error);
      }
    );
  }

  private async compressAndSetAvatarNative(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (ev: ProgressEvent) => {
      const imageContent = reader.result;
      let options = {
        uri: imageContent,
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        base64: true
      } as ImageResizerOptions;

      this.imageResizer
        .resize(options)
        .then((imageContent: string) => {
          this.member.avatar = imageContent;
          this.avatarUpload = false;
        })
        .catch(e => {
          this.presentToast(e);
        });
    };
    reader.onerror = (ev: ProgressEvent) => {
      this.presentToast(ev);
    };
    reader.readAsDataURL(file);
  }

  async presentToast(msg) {
    this.avatarUpload = false;
    console.error(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
