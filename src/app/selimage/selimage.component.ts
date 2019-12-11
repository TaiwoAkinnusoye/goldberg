import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PreviewComponent } from "../preview/preview.component";
import { Meta } from "@angular/platform-browser";
import { MetaService } from "ng2-meta";

@Component({
  selector: "app-selimage",
  templateUrl: "./selimage.component.html",
  styleUrls: ["./selimage.component.css"]
})
export class SelimageComponent implements OnInit {
  constructor(
    private http: Http,
    public dataservice: DataService,
    private router: Router,
    public dialogRef: MatDialogRef<SelimageComponent>,
    public dialog: MatDialog,
    private meta: Meta
  ) {
    this.http = http;
    // this.meta.addTag({
    //   name: "twitter:image",
    //   content: "How to use Angular 4 meta service"
    // });
    this.meta.updateTag({
      name: "twitter:image",
      content: "assets/testimag.png"
    });
    const author = this.meta.getTags("name='twitter:image'");
    console.log(author[0]); //<meta name="author" content="talkingdotnet">
  }

  session;
  senimg;
  loader = false;
  ngOnInit() {}
  imageSrc: String;
  fileUpload(event) {
    this.loader = true;
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      if (fileList[0].size > 4194304) {
        alert("Please Ensure Image Size is Less Than 4mb");
      } else {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];

          this.dataservice.file = file;

          const reader = new FileReader();
          reader.onload = e => (this.imageSrc = reader.result as string);

          reader.readAsDataURL(file);
        }

        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append("image", file, file.name);

        this.http
          .post("https://fastcoin.ng/api/images/", formData)
          .map(res => res.json())
          // .catch(error => Observable.throw(error))
          .subscribe(
            data => {
              this.loader = false;
              console.log(data);
              this.senimg = data.image;
              this.go();

              // this.router.navigateByUrl("/fifth");
            },
            error => console.log(error)
          );
      }
    }
  }

  // push() {

  //   let formData: FormData = new FormData();
  //   formData.append("action", "apply_effects");
  //   formData.append("api_key", "wCDR6kBwws16D5gNji25numTbUCizOTw");
  //   formData.append("session_id", this.session);
  //   formData.append("effects[effect_id]", (100).toString());
  //   console.log(formData);

  //   this.http
  //     .post("https://api.cmfapp.co.uk/api2/", formData)
  //     .map(res => res.json())

  //     .subscribe(
  //       data => {
  //         console.log(data);

  //         this.router.navigateByUrl("/Result");
  //       },
  //       error => console.log(error)
  //     );
  // }

  imgs = [
    {
      link: "assets/hp-p1.png",
      title: "first"
    },
    {
      link: "assets/hp-p2.png",
      title: "second"
    },
    {
      link: "assets/hp-p3.png",
      title: "third"
    },
    {
      link: "assets/hp-p4.png",
      title: "fourth"
    },
    {
      link: "assets/hp-p5.png",
      title: "fifth"
    },
    {
      link: "assets/hp-p6.png",
      title: "sixth"
    }
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageurl(link) {
    console.log(link);
    this.dataservice.bg = link;
    this.router.navigateByUrl("/preview");
    this.onNoClick();
  }

  openDialog(link) {
    console.log(link);
    this.dataservice.bg = link;
    this.dataservice.pre = true;
    this.onNoClick();

    this.dialog.open(PreviewComponent, {
      panelClass: "custom-dialog-container"
    });
  }
  go() {
    this.dataservice.bg = this.senimg;
    this.onNoClick();
    this.dataservice.pre = false;

    this.dialog.open(PreviewComponent, {
      panelClass: "custom-dialog-container"
    });
  }
}
