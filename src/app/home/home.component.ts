import { Component, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { DataService } from "../services/data.service";
import { SelimageComponent } from "../selimage/selimage.component";
import "rxjs/add/operator/map";
import { DomSanitizer } from "@angular/platform-browser";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { HappyComponent } from "../happy/happy.component";
import { ViewhappyComponent } from "../viewhappy/viewhappy.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dataservice: DataService,
    private http: Http
  ) {
    this.http = http;
  }
  number = 25;

  chan(t) {
    this.number = 25 - t.value.length;
  }
  datas: any[];
  session;
  ngOnInit() {
    this.http
      .get("https://fastcoin.ng/api/images/")
      .map(res => res.json())
      // .catch(error => Observable.throw(error))
      .subscribe(
        data => {
          console.log(data);
          this.datas = data.filter((item, index) => index < 6);

          // this.router.navigateByUrl("/fifth");
        },
        error => console.log(error)
      );
  }
  imageSrc: String;
  fileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(file);
    }
    let fileList: FileList = event.target.files;
    console.log(fileList);
  }

  push(name, text) {
    console.log(name.value, text.value);
  }

  openDialog(name, text) {
    this.dataservice.name = name.value;
    this.dataservice.text = text.value;
    this.dialog.open(SelimageComponent, {
      panelClass: "custom-dialog-container"
    });
  }
  openDialog2() {
    this.dialog.open(HappyComponent, {
      panelClass: "custom-dialog-container"
    });
  }
  viewpic(link) {
    this.dataservice.view = link;
    this.dialog.open(ViewhappyComponent, {
      panelClass: "custom-dialog-container"
    });
  }
}
