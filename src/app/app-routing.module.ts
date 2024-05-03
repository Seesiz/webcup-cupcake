import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './Info/feature/feature.component';
import { TeamComponent } from './info/team/team.component';

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
