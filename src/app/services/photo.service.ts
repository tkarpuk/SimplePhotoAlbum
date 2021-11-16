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

  getAllPhotos(pageSize: number, pageN: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.config.baseUrl}photos`, { params: { pageSize, pageN}});
  }

  getCountPhotos(): Observable<number> {
    return this.http.get<number>(`${this.config.baseUrl}photos/count`);
  }

  getPhotoById(id: number): Observable<Photo>{
    return this.http.get<Photo>(`${this.config.baseUrl}photos/${id}`);
  }

  getImageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.config.baseUrl}photos/${id}/image`);
  }

  updatePhoto(id: number, photo: Photo): Observable<any> {
    return this.http.put<any>(`${this.config.baseUrl}photos/${id}`, photo);
  }

  deletePhoto(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.config.baseUrl}photos/${id}`);
  }

  createPhoto(photo: Photo, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    //formData.append("photoInfo", JSON.stringify(photo));
    formData.append("caption", photo.caption);
    formData.append("description", photo.description);

    return this.http.post<any>(`${this.config.baseUrl}photos`, formData);
  }
}
