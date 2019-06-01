import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  newReleases: any[] = [];
  loading: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor( private spotifyService: SpotifyService) {
    this.hasError = false;
    this.loading = true;
    this.spotifyService.getNewReleases().subscribe( (data: any) => {
      this.newReleases = data;
      this.loading = false;
    }, ( errorService ) => {
      this.loading = false;
      this.hasError = true;
      this.errorMessage = errorService.error.error.message;
    });
  }

}
