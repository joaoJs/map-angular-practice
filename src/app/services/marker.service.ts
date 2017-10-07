import { Injectable } from '@angular/core';
import { Init } from '../init-markers';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MarkerService extends Init {

  geoUrl:string = 'https://maps.googleapis.com/maps/api/geocode/json?';

  distanceUrl: string = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

  key: string = 'AIzaSyBZmlw9qWUNZvc1jbUEZ8HQXHGTHXe3Jm4';

  constructor(
    private http: HttpClient
  ) {
    super();
    console.log("MarkerService Initialized");
    this.load();
  }

  getMarkers() {
    const markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  addMarker(newMarker: any) {
    // fetch markers
    const markers = JSON.parse(localStorage.getItem('markers'));
    // push them to array
    markers.push(newMarker);
    // set ls markers back
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker: any,index: number, newLat: number, newLng: number) {
      console.log('Updating Marker... ');

      const markers = JSON.parse(localStorage.getItem('markers'));

      console.log("Marker ---> ", markers[index]);

      markers[index].lat = newLat;
      markers[index].lng = newLng;

      console.log("Marker ---> ", markers[index]);

      localStorage.setItem('markers', JSON.stringify(markers));
    }

    removeMarker(index: number) {
      const markers = JSON.parse(localStorage.getItem('markers'));
      markers.splice(index,1);
      localStorage.setItem('markers', JSON.stringify(markers));
    }

    getOrigin(location: string) {
      return this.http.get(this.geoUrl + 'address=' + location + '&key=' + this.key);
    }

    getDestination(location: string) {
      return this.http.get(this.geoUrl + 'address=' + location + '&key=' + this.key);
    }

    getDistance(lat: string, lng: string,lat2: string, lng2: string) {
      return this.http.get(this.distanceUrl + 'origins=' + lat + ',' + lng + '&destinations=' + lat2 + ',' + lng2 + '&key=' + this.key);
    }

}
