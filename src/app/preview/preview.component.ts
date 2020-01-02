import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import { DomSanitizer } from "@angular/platform-browser";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as html2canvas from "html2canvas";
import * as jsPDF from "jspdf";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"]
})
export class PreviewComponent implements OnInit {
  constructor(
    private http: Http,
    public dataservice: DataService,
    public dialogRef: MatDialogRef<PreviewComponent>,
    private router: Router
  ) {
    this.http = http;
  }

  name;
  text;
  hap = "#Omoluabi is";
  imgsrc;
  img;
  filer;

  imgData;

  ngOnInit() {
    console.log(
      this.dataservice.bg,
      this.dataservice.name,
      this.dataservice.text
    );
    this.name = this.dataservice.name;
    this.text = this.dataservice.text;

    this.filer = this.dataservice.file;

    setTimeout(() => {
      this.getter();
    }, 5000);
    if (this.dataservice.pre === false) {
      const reader = new FileReader();
      reader.onload = e => (this.img = reader.result as string);

      reader.readAsDataURL(this.filer);
    } else {
      this.img = this.dataservice.bg;
    }
  }

  hideDownloadBtn() {
    let d = document.getElementById("dw");
    d.addEventListener("click", (e) => {
      d.style.visibility = "hidden"
    });
  }

  download() {
    this.hideDownloadBtn();
    html2canvas(document.getElementById("mat-dialog-1")).then(function(canvas) {
      var a = document.createElement("a");
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/png");
      // .replace("image/jpeg", "image/octet-stream");
      a.download = "Omoluabi.png";
      a.click();
    });
  }

  getter() {
    //<<<---    using ()=> syntax
    
    var that = this;
    html2canvas(document.getElementById("mat-dialog-1"), {
      backgroundColor: "transparent"
    }).then(function(canvas) {
      let a = canvas.toDataURL("image/jpeg");
      a.replace("image/jpeg", "image/octet-stream");

      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }

      var file = dataURLtoFile(a, "hello.jpg");
      console.log(file);

      let formData: FormData = new FormData();
      formData.append("image", file, file.name);

      that.http
        .post("https://fastcoin.ng/api/saveimage/", formData)
        .map(res => res.json())
        // .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            console.log(data);

            // this.router.navigateByUrl("/fifth");
          },
          error => console.log(error)
        );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// var imgData = canvas.toDataURL('image/jpeg');
