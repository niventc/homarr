import { Observable } from 'rxjs';

export abstract class ImageService {
    abstract getImageUrl(key: string): Observable<string>;
    abstract uploadImage(file: File): Observable<string>;
}