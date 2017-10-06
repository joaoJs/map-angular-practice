import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lat: number = 25.7617;
  lng: number = -80.1918;
  zoom: number = 15;
  markers: any[] = [
  {
    name: "miami",
    lat: this.lat,
    lng: this.lng,
    draggable: true
  },
  {
    name: "sao paulo",
    lat: -23.5505199,
    lng: -46.63330939999999,
    draggable: true
  },
  ];

  newMarker: any = {};

  markerName: string = "";
  markerLat: string = "";
  markerLng: string = "";
  markerDraggable: string = "No";

  markerClicked(marker: any, index: number) {
    console.log(marker.name + " was clicked at " + index + " position.");
  }

  mapClicked($event: any) {
    console.log('clicked');
    this.newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

  this.markers.push(this.newMarker);
  }

  addMarker() {
    console.log('Adding Marker.');
    this.newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: this.markerDraggable
    }

    this.markers.push(this.newMarker);
  }

}
