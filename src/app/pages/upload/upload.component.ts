import { Component } from '@angular/core';

import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonDirective } from 'primeng/button';

import { Steps } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ProgressBar,
    ButtonDirective,
    Steps,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = -1; // Initialize with -1 to hide the progress bar
  activeStep: number = 0; // To track the current step
  password: string = '';
  errorMessage: string | null = null;
  message: string | null = null;

  steps: MenuItem[] = [
    { label: 'Select File & Password' },
    { label: 'Processing' },
    { label: 'Complete' },
  ];
  constructor(private fileUploadService: UploadService) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.message = '';

    if (this.selectedFile && this.password) {
      this.uploadProgress = 0;
      this.activeStep = 1; // Move to processing step

      this.fileUploadService
        .decryptPdf(this.selectedFile, this.password)
        .subscribe({
          next: ({ progress, blob }) => {
            this.uploadProgress = progress;
            if (blob) {
              // Download the decrypted PDF
              const a = document.createElement('a');
              const objectUrl = URL.createObjectURL(blob);
              a.href = objectUrl;
              a.download = 'decrypted_' + this.selectedFile!.name;
              this.activeStep = 2;
              this.message = 'Your PDF is ready!';
              a.click();
              URL.revokeObjectURL(objectUrl);
            }
          },
          error: (err) => {
            console.error('Error occurred:', err);
            this.errorMessage = 'Error occurred. Please check the password and try again.';
            this.activeStep = 0;
            this.uploadProgress = -1;
          },
        });
    } else {
      this.errorMessage = 'Please select a file and enter a password.';
    }
  }

  reset(): void {
    this.selectedFile = null;
    this.uploadProgress = -1;
    this.activeStep = 0;
    this.message = '';
    this.errorMessage = '';
    this.password = '';
  }
}
