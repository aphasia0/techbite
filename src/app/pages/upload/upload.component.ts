import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonDirective } from 'primeng/button';

import { Steps } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';
import { SeoService, SeoFaqItem } from 'src/app/services/seo.service';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBar, ButtonDirective, Steps, PageHeaderComponent],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number = -1; // Initialize with -1 to hide the progress bar
  activeStep: number = 0; // To track the current step
  password: string = '';
  errorMessage: string | null = null;
  message: string | null = null;

  readonly faq: SeoFaqItem[] = [
    {
      question: 'Can I remove the password from any PDF?',
      answer:
        'You can remove the open password from a PDF when you know it. The tool does not crack or guess unknown passwords, and you should only use it on documents you own or are allowed to modify.',
    },
    {
      question: 'What happens to my file after processing?',
      answer:
        'The PDF is sent over HTTPS to the processing service, decrypted and returned to your browser as a download. Avoid uploading documents that contain information you are not allowed to share.',
    },
    {
      question: 'Do I need to install anything?',
      answer:
        'No. The PDF password remover runs in the browser and only needs the file and its current password. There is no account, no installation and no plugin.',
    },
    {
      question: 'Why does the tool ask for the password?',
      answer:
        'The password is required to decrypt the document. Without it the file cannot be opened, so the service could not produce an unprotected copy.',
    },
  ];

  steps: MenuItem[] = [
    { label: 'Select File & Password' },
    { label: 'Processing' },
    { label: 'Complete' },
  ];
  constructor(
    private fileUploadService: UploadService,
    private http: HttpClient,
    private seo: SeoService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'PDF Password Remover',
      description:
        'Remove the password from a PDF you own, directly in your browser. No installation, no account: upload the file, enter the password and download the unprotected copy.',
      path: '/pdf-remove-password',
      faq: this.faq,
    });
  }


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
            this.changeDetector.markForCheck();
          },
          error: (err) => {
            console.error('Error occurred:', err);
            this.errorMessage = 'Error occurred. Please check the password and try again.';
            this.activeStep = 0;
            this.uploadProgress = -1;
            this.changeDetector.markForCheck();
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
