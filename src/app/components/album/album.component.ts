import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album!: Album;
  photos: Photo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
