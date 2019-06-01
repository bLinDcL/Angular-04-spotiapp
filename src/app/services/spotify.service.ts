import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBSzSoZZ3d1BHIBhhFXsl67VYsn1CBrhqpAM2yYmiYpazPj_2fL8ay4TwRHVuq3Y5Uw6s0DylvrtZ6yAVMM'
    });

    return this.http.get( url, { headers } );
  }

  getNewReleases() {
    return this.getQuery( 'browse/new-releases?limit=20' ).pipe( map( data => data['albums'].items ));
  }

  getArtists( termino: string ) {
    return this.getQuery( `search?q=${ termino }&type=artist&limit=15` ).pipe( map( data => data['artists'].items ));
  }

  getArtist( artistaId: string ) {
    return this.getQuery(`artists/${ artistaId }`);
  }

  getArtistTopTracks( artistaId: string ) {
    return this.getQuery(`artists/${ artistaId }/top-tracks?country=CL`).pipe( map( data => data['tracks'] ));
  }

}
