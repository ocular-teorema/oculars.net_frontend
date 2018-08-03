import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LkComponent } from './components/lk/lk.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ResetComponent } from './components/reset/reset.component';
import { DownloadComponent } from './components/download/download.component';


const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  {
    path: 'account',
    children: [
      { path: '', redirectTo: 'lk', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'reset', component: ResetComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      { path: 'lk', component: LkComponent, canActivate: [AuthGuardService] },
      { path: 'download', component: DownloadComponent, canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
