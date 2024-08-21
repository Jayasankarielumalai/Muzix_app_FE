import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private tmdbApiKey = '397f3e30e0968cb5d22397bcfc654fcb';
  private tmdbBaseUrl = 'https://api.themoviedb.org/3';
  private backendBaseUrl = 'http://localhost:8082/api/v2/user/'; 
  constructor(private http: HttpClient, private tokenService: JwtTokenService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // TMDB methods

  // getMovieDetails(movieId: number): Observable<any> {
  //   return this.http.get(`${this.tmdbBaseUrl}/movie/${movieId}?api_key=${this.tmdbApiKey}`);
  // }

  // Favorite management methods with JWT token
  addFavorite(movie: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.backendBaseUrl}/saveFavouriteMovie`, movie, { headers });
  }

  getFavorites(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.backendBaseUrl}/getAllFavouriteMovies`, { headers });
  }

  removeFavorite(movieId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.backendBaseUrl}/movies/${movieId}`, { headers });
  }
  getSingleFavorite(movieName:String):Observable<any>{
    const headers=this.getAuthHeaders();
    return this.http.get(`${this.backendBaseUrl}/search/${movieName}`,{ headers })
  }

}
