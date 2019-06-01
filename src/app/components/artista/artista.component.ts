import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artist: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor( private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService ) {
    this.activatedRoute.params.subscribe( param => {
      this.getArtista( param['id'] ) ;
    });
  }

  getArtista( artistId: string ) {
    this.loading = true;
    this.spotifyService.getArtist( artistId ).subscribe( artist => {
      this.artist = artist;
      this.getTopTracks( artistId );
      this.loading = false;
    } );
  }

  getTopTracks( artistId: string) {
    this.spotifyService.getArtistTopTracks( artistId ).subscribe( topTracks => {
      this.topTracks = topTracks;
    });
  }

}
