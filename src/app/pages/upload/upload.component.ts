import { Component } from '@angular/core';

import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProgressBarModule,
    ButtonModule,
    JsonPipe,
    StepsModule,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = -1; // Initialize with -1 to hide the progress bar
  uploadedFilename: String = ''; // To store the uploaded filename
  activeStep: number = 1; // To track the current step
  password: String = '';
  errorMessage: String | null = null;
  message: String | null = null;

  steps: MenuItem[] = [
    { label: 'Select File' },
    { label: 'Upload File' },
    { label: 'View Progress' },
  ];
  constructor(private fileUploadService: UploadService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.selectedFile) {
      this.fileUploadService
        .uploadFile(this.selectedFile)
        .subscribe(({ progress, filename }) => {
          this.uploadProgress = progress;
          if (filename) {
            this.uploadedFilename = filename;
            this.activeStep = 1; // Move to password step
          }
        });
    }
  }
  onSubmitPassword(): void {
    this.errorMessage = '';
    if (this.selectedFile) {
      this.fileUploadService
        .removePassword(this.uploadedFilename, this.password)
        .subscribe({
          next: (blob: Blob) => {
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;

            a.download = 'no_password_' + this.uploadedFilename; // Default filename, you can set this dynamically
            this.activeStep = 2;
            this.message = 'Your PDF is ready: ' + this.uploadedFilename;
            a.click();
            URL.revokeObjectURL(objectUrl);
          },
          error: (err) => {
            console.error('Error occurred:', err);
            this.errorMessage = 'Error occurred. Please try again';
          },
        });
    }
  }

  nextStep(): void {
    this.activeStep++;
  }

  reset(): void {
    this.selectedFile = null;
    this.uploadProgress = -1;
    this.activeStep = 0;
    this.message = '';
    this.errorMessage = '';
    this.password = ''
  }
}
