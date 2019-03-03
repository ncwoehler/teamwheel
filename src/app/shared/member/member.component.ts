import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Member } from "../../domain/Member";
import { ToastController } from "@ionic/angular";

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

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  triggerAvatarChange() {
    // try opening the hidden file input via click
    this.fileInput.nativeElement.click();
  }

  handleInputChange($event) {
    const file: File = $event.target.files[0];
    this.avatarUpload = true;
    this.compressAndSetAvatar(file);
  }

  private async compressAndSetAvatar(file) {
    /* https://github.com/digitalascetic/ngx-pica/blob/master/src/ngx-pica.service.ts
    this.pica.resizeImage(file, 40, 40).subscribe(
      result => {
        this.setAvatarFromFileUpload(new File([result], result.name));
      },
      e => {
        console.log("😢 Oh no!", e); // TODO error handling
        this.avatarUpload = false;
        this.presentToast(e);
      }
    );*/
  }

  private setAvatarFromFileUpload(file: File) {
    const reader: FileReader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.avatarUpload = false;
      this.member.avatar = event.target.result;
    });
    reader.onerror = (ev: ProgressEvent) => {
      this.avatarUpload = false;
      this.presentToast(ev);
      console.error(ev);
    };

    reader.readAsDataURL(file);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
