import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureComponent } from './Info/feature/feature.component';
import { TeamComponent } from './info/team/team.component';
import { LoginComponent } from './component/login/login.component';
import { ArbreComponent } from './component/arbre/arbre.component';
import { FormsModule } from '@angular/forms';
import { TrocComponent } from './component/troc/troc.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StartComponent,
    FeatureComponent,
    TeamComponent,
    LoginComponent,
    ArbreComponent,
    TrocComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
