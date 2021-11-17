import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  formPhoto!: FormGroup;
  id: number = 0;
  photo: Photo = {
    id: 0,
    caption: '',
    description: ''
  };

  file!: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.extractIdFromRoute();
    this.createForm(this.id <= 0);

    if (this.id > 0) {
      this.loadPhoto(this.id);
    }
  }

  extractIdFromRoute() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  createForm(needFileValidator: boolean = false) {
    this.formPhoto = new FormGroup({
      caption: new FormControl(this.photo.caption, [Validators.required]),
      description: new FormControl(this.photo.description, [Validators.required]),
      image: new FormControl(null)
    });

    if (needFileValidator)
      this.formPhoto.get('image')?.addValidators([Validators.required]);
  }

  updateFormPhoto() {
    this.formPhoto.get('caption')?.setValue(this.photo.caption);
    this.formPhoto.get('description')?.setValue(this.photo.description);
  }

  loadPhoto(id: number) {
    this.photoService.getPhotoById(id)
    .subscribe((data: Photo) => {
      this.photo = data;
      this.updateFormPhoto();
  },
      error => { console.log(error.message); alert(error.message)});
  }

  preparePhotoData() {
    this.photo = {
      id: this.id,
      caption: this.formPhoto.get('caption')?.value,
      description: this.formPhoto.get('description')?.value
    }
  }

  submitPhoto() {
    this.preparePhotoData();

    if (this.id > 0) {
      this.updatePhoto();
    }
    else {
      this.createPhoto();
    }
  }

  updatePhoto() {
    this.photoService.updatePhoto(this.id, this.photo)
    .subscribe(data => { this.router.navigateByUrl('/album'); },
      error => { console.log(error.message); alert(error.message)});
  }

  createPhoto() {
    this.photoService.createPhoto(this.photo, this.file)
    .subscribe(data => { this.router.navigateByUrl('/album'); },
      error => { console.log(error.message); alert(error.message); }
    )
  }

  cancelPhoto() {
    this.router.navigateByUrl('/album');
  }

  onChangeFileControl(event: any) {
    this.file = event.target.files[0];
  }
}
