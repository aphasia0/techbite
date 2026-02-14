import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'https://pdf-tools.antoniogiordano.dev/api/decrypt-pdf';

  constructor(private http: HttpClient) { }
 
  decryptPdf(file: File, password: string): Observable<{ progress: number, blob: Blob | null }> {
    const formData: FormData = new FormData();
    formData.append('pdf', file);
    formData.append('password', password);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return {
              progress: event.total ? Math.round(100 * (event.loaded / event.total)) : 0,
              blob: null
            };
          case HttpEventType.Response:
            const response = event as HttpResponse<Blob>;
            return { progress: 100, blob: response.body };
          default:
            return { progress: 0, blob: null };
        }
      }),
      catchError((error) => this.handleError(error))
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
