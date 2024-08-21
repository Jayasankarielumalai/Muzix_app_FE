import { Component } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { JwtTokenService } from '../services/jwt-token.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  private tmdbUrl = 'https://api.themoviedb.org/3';
  private apiUrl = 'http://localhost:8082/api/v2/';

  favorites: any[] = [];

  constructor(private favoriteService: FavoriteService, private tokenService: JwtTokenService) {}

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      // Handle unauthorized access, e.g., redirect to login
      console.log('No token found, redirecting to login...');
      return;
    }
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe(data => {
      this.favorites = data;
    });
  }

  removeFavorite(movieId: number): void {
    this.favoriteService.removeFavorite(movieId).subscribe(() => {
      this.loadFavorites();
    });
  }
}



