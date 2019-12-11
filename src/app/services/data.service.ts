import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  constructor() {}

  bg;
  name;
  text;
  file;
  image;
  pre = true;
  view;
}
