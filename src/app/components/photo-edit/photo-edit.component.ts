import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  )
  { }

  ngOnInit(): void {

    this.extractIdFromRoute();
    if (this.id <= 0) {
      // TODO: load data
    }
    this.createForm(this.id <= 0);
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

  submitPhoto() {

  }

  cancelPhoto() {
    this.router.navigateByUrl('/album');
  }
}
