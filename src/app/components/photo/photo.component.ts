import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photoId: number = 0;
  thumbnail: any;
  photo: Photo = {id: 0, caption:'', description:''};

  constructor(private photoService: PhotoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPhotoById(this.photoId);
    this.getImageById(this.photoId);
  }

  getImageById(id: number) {
    this.photoService.getImageById(id)
    .subscribe(
      (getImage : any) => {
        let objectURL = `data:image/${getImage.imagetype};base64,${getImage.image}`;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    },
      error => { console.log(error.message); alert(error.message);}
    );
  }

  getPhotoById(id: number) {
    this.photoService.getPhotoById(id)
    .subscribe(data => { this.photo = data; },
      error => { console.log(error.message); alert(error.message)});
  }

  deletePhoto() {
    if (confirm('Are you sure you want to delete this photo')) {
      this.photoService.deletePhoto(this.photoId)
      .subscribe(data => {},
        error => { console.log(error.message); alert(error.message)}
        );
    }
  }
}
