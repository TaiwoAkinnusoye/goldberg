import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { PreviewComponent } from "./preview/preview.component";
import { SelimageComponent } from "./selimage/selimage.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material";
import { DataService } from "./services/data.service";
import { appRoutes } from "./route";
import { RouterModule } from "@angular/router";
import { CloudinaryModule } from "@cloudinary/angular-5.x";
import * as Cloudinary from "cloudinary-core";
import { FormsModule } from "@angular/forms";
import { HappyComponent } from "./happy/happy.component";
import { ViewhappyComponent } from "./viewhappy/viewhappy.component";

//Auth service config

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreviewComponent,
    SelimageComponent,
    HappyComponent,
    ViewhappyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: "ikeola-darey" }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent],

  entryComponents: [
    SelimageComponent,
    PreviewComponent,
    HappyComponent,
    ViewhappyComponent
  ]
})
export class AppModule {}
