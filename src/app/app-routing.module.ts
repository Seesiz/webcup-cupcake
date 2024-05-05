import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './Info/feature/feature.component';
import { TeamComponent } from './info/team/team.component';
import { LoginComponent } from './component/login/login.component';
import { ArbreComponent } from './component/arbre/arbre.component';
import { TrocComponent } from './component/troc/troc.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: InscriptionComponent,
      },
      {
        path: 'home',
        component: LandingPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'started',
            pathMatch: 'full',
          },
          {
            path: 'started',
            component: StartComponent,
          },
          {
            path: 'feature',
            component: FeatureComponent,
          },
          {
            path: 'teams',
            component: TeamComponent,
          },
          {
            path: 'arbre',
            component: ArbreComponent,
          },
          {
            path: 'troc/:id',
            component: TrocComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
