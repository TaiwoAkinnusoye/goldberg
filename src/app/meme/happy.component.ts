import { Component, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from "../services/data.service";
import { SelimageComponent } from "../selimage/selimage.component";
import "rxjs/add/operator/map";
import { DomSanitizer } from "@angular/platform-browser";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { ViewhappyComponent } from "../viewmeme/viewhappy.component";

@Component({
  selector: "app-happy",
  templateUrl: "./happy.component.html",
  styleUrls: ["./happy.component.css"]
})
export class HappyComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dataservice: DataService,
    public dialogRef: MatDialogRef<HappyComponent>,
    private http: Http
  ) {
    this.http = http;
  }
  datas: any[];
  ngOnInit() {
    this.http
      .get("https://fastcoin.ng/api/images/")
      .map(res => res.json())
      // .catch(error => Observable.throw(error))
      .subscribe(
        data => {
          console.log(data);
          // this.datas = data.filter((item, index) => index < 6);
          this.datas = data;

          // this.router.navigateByUrl("/fifth");
        },
        error => console.log(error)
      );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  viewpic(link) {
    // this.onNoClick();
    this.dataservice.view = link;
    this.dialog.open(ViewhappyComponent, {
      panelClass: "custom-dialog-container"
    });
  }
}
