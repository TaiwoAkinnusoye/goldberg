import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  bg;
  name;
  text;
  file;
  image;
  pre = true;
  view;

  getCloudinaryImage(version, id) {
    return fetch(`https://res.cloudinary.com/parpend/image/upload/v${version}/${id}.jpg`)
  }
}
