import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { PhotoEditComponent } from './components/photo-edit/photo-edit.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: AlbumComponent, canActivate: [AuthGuardService ] },
  { path: 'album', component: AlbumComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'photo/:id', component: PhotoEditComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'album' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
