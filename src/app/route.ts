import { Routes } from "@angular/router";

import { Component } from "@angular/core";
import { PreviewComponent } from "./preview/preview.component";
import { HomeComponent } from "./home/home.component";
import { OmoluabiComponent} from './omoluabi/omoluabi.component';

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "preview", component: PreviewComponent },
  { path: "home", component: HomeComponent },
  { path: 'omoluabi/:version/:cloudinary_id', component: OmoluabiComponent}
];
