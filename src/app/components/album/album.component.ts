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
  page = 1;
  pageCount = 1;

  album: Album = {
    id: 1,
    caption: 'First Album',
    description: 'This album is first and only one in fake DB.'
  };

  photos: Photo[] = [];

  constructor(private photoService: PhotoService,
    private config: ConfigureService) { }

  ngOnInit(): void {
    this.getPageCount();
    this.loadData();
  }

  private getPhotos(pageSize: number, pageN: number) {
    this.photoService.getAllPhotos(pageSize, pageN)
    .subscribe(data => this.photos = data,
      error => alert(error.message));
  }

  private loadData() {
    this.getPhotos(this.config.pageLimit, this.page);
  }

  onPageChange(event: any) {
    this.page = event;
    this.loadData();
  }

  private getPageCount() {
    this.photoService.getCountPhotos()
    .subscribe(data => {this.pageCount = data;},
      error => console.log(error.message));
  }
}
