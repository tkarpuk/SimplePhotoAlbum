import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { ConfigureService } from './configure.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient,
    private config: ConfigureService
    ) {}

  getAllPhotos(pageLimit: number, pageNumber: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.config.baseUrl}/photos`, { params: { pageLimit, pageNumber}});
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.config.baseUrl}/photos/${id}`);
  }

  updatePhoto(id: number, photo: Photo) : Observable<any> {
    return this.http.patch<any>(`${this.config.baseUrl}/photos/${id}`, photo);
  }

  deletePhoto(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.config.baseUrl}/photos/${id}`);
  }

  createPhoto(photo: Photo) : Observable<Photo> {
    return this.http.post<Photo>(`${this.config.baseUrl}/photos/`, photo);
  }
}
