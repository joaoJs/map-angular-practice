import { Injectable } from '@angular/core';
import { Init } from '../init-markers';

@Injectable()
export class MarkerService extends Init {

  constructor(
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

      /*markers.forEach(m => {
        if (m.lat === marker.lat && m.lng === marker.lng) {
          marker.lat = newLat;
          marker.lng = newLng;
        }
      });*/

      localStorage.setItem('markers', JSON.stringify(markers));
    }

}
