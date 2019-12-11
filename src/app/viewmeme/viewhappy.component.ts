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
  selector: "app-viewhappy",
  templateUrl: "./viewhappy.component.html",
  styleUrls: ["./viewhappy.component.css"]
})
export class ViewhappyComponent implements OnInit {
  constructor(
    private http: Http,
    public dataservice: DataService,
    public dialogRef: MatDialogRef<ViewhappyComponent>,
    private router: Router
  ) {
    this.http = http;
  }

  img;

  ngOnInit() {
    this.img = this.dataservice.view;
  }

  download() {
    html2canvas(document.getElementById("results")).then(function(canvas) {
      var a = document.createElement("a");
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/png");
      // .replace("image/jpeg", "image/octet-stream");
      a.download = "maltina.png";
      a.click();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
