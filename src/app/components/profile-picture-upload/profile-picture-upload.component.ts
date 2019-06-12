import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture-upload',
  templateUrl: './profile-picture-upload.component.html',
  styleUrls: ['./profile-picture-upload.component.scss']
})
export class ProfilePictureUploadComponent implements OnInit {
  @Input()
  pictureUrl: string;

  constructor() {
    console.log(this.pictureUrl);
  }

  ngOnInit() {}
}
