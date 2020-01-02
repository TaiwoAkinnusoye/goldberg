import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import * as html2canvas from "html2canvas";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-omoluabi',
  templateUrl: './omoluabi.component.html',
  styleUrls: ['./omoluabi.component.css']
})
export class OmoluabiComponent implements OnInit {
  uploaded_image;
  version;
  id;
  omoluabi_name;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.getCloudinaryImage();
    this.uploaded_image = localStorage.getItem('image');
    this.omoluabi_name = this.data.text;
    setTimeout(() => this.download(), 5000);
  }

  getCloudinaryImage() {
    this.version = this.route.snapshot.paramMap.get('version');
    this.id = this.route.snapshot.paramMap.get('cloudinary_id');
    this.data.getCloudinaryImage(this.version, this.id).then(data => {
      localStorage.setItem('image', data.url);
    })
  }

  download() { 
    html2canvas(document.getElementById("omoluabi-template-bg")).then(function(canvas) {
      var a = document.createElement("a");
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/png");
      // .replace("image/jpeg", "image/octet-stream");
      a.download = "Omoluabi.png";
      a.click();
    }).catch(error => console.log(error));
  }
  
}
