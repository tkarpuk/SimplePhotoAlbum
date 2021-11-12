import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Photo } from 'src/app/models/photo';
import { ConfigureService } from 'src/app/services/configure.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: Album = {
    id: 1,
    caption: 'First Album',
    description: 'This album is first and only one in fake DB.'
  };

  photos: Photo[] = [];

  constructor(private photoService: PhotoService,
    private config: ConfigureService) { }

  ngOnInit(): void {
    this.getPhotos(this.config.pageLimit, 1);
  }

  private getPhotos(pageSize: number, pageN: number) {
    this.photoService.getAllPhotos(pageSize, pageN)
    .subscribe(data => this.photos = data,
      error => alert(error.message));
  }
}
