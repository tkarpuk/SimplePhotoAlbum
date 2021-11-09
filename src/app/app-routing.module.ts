import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { PhotoEditComponent } from './components/photo-edit/photo-edit.component';

const routes: Routes = [
  { path: '', component: AlbumComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'photo/:id', component: PhotoEditComponent },
  { path: '**', redirectTo: 'album' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
