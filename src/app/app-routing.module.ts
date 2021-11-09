import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { PhotoComponent } from './components/photo/photo.component';

const routes: Routes = [
  { path: '', component: AlbumComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'photo/:id', component: PhotoComponent },
  { path: '**', redirectTo: 'album' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
