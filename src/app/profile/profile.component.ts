import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFile: File
  user: { username: string, email: string, image: { data: string, contentType: string } };
  imageSrc = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user?.image) {
      const { image } = this.user;
      this.imageSrc = this.constructImageSrc(image);
    }
  }

  constructImageSrc = (image) => {
    return `data:${image?.contentType};base64,${image?.data}`
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  deleteImage = ()=>{
    this.http.delete(`http://localhost:3000/image/${this.user.username}`).subscribe(success=>{
      this.imageSrc = '';
    })
  } 
   onUpload() {
    // upload code goes here
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile);

    this.http.post(`http://localhost:3000/upload/${this.user.username}`, uploadData)
      .subscribe(success => {
        if (success) {
          this.http.get(`http://localhost:3000/loadimage/${this.user.username}`).subscribe(updatedImage => {
            this.imageSrc = this.constructImageSrc(updatedImage);
          })
        }
      });
  }
}
