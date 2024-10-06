import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'https://api.antoniogiordano.dev:5555/upload'; // URL del controller Spring Boot
  private apiUrlRemovePassword = 'https://api.antoniogiordano.dev:5555/remove-password'; // URL del controller Spring Boot

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<{ progress: number, filename: string | null }> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return {
              progress: event.total ? Math.round(100 * (event.loaded / event.total)) : 0,
              filename: null
            };
          case HttpEventType.Response:
            const response = event as HttpResponse<any>;
            return { progress: 100, filename: response.body.result }; // File uploaded successfully
          default:
            return { progress: 0, filename: null };
        }
      })
    );
  }


  removePassword(filename: String, password: String) {
    return this.http.post(this.apiUrlRemovePassword, { password, filename }, { responseType: 'blob' }).pipe(
      map((response: Blob) => {
        return response;
      }, catchError((resp) => this.handleError(resp)))
    );
  }

   // Error handling function
   private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log the error for debugging

    // Return a more user-friendly error message or rethrow it
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
