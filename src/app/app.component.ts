import { Component } from '@angular/core';
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  markers: any[];



  constructor(
    private markerService: MarkerService
  ) {
    this.markers = this.markerService.getMarkers();
  }

  title = 'app';
  lat: number = 25.7617;
  lng: number = -80.1918;
  zoom: number = 15;

  // markers: any[] = [
  // {
  //   name: "miami",
  //   lat: this.lat,
  //   lng: this.lng,
  //   draggable: true
  // },
  // {
  //   name: "sao paulo",
  //   lat: -23.5505199,
  //   lng: -46.63330939999999,
  //   draggable: true
  // }
  // ];

   stations: any = [
       {lat: 25.7810171, lng: -80.19628360000002},
       {lat: 25.776034, lng: -80.196061},
       {lat: 25.7638502, lng: -80.195425},
       {lat: 25.7497383, lng: -80.211783},
       {lat: 25.7397915, lng: -80.2388733},
       {lat: 25.7329031, lng: -80.25484279999999},
       {lat: 25.7148675, lng: -80.2770295},
       {lat: 25.7050916, lng: -80.2890178},
       {lat: 25.6919369, lng: -80.3051089},
       {lat: 25.6850431, lng: -80.3136722}
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
    let bool = false;
    if (this.markerDraggable === 'Yes') {
      bool = true;
    } else {
      bool = false;
    }
    this.newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: bool
    }

    this.markers.push(this.newMarker);
    this.markerService.addMarker(this.newMarker);
  }

  markerDragEnd(marker: any,index: number, $event: any) {
    console.log('Dragend -> ', marker, $event);

    const upMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: marker.draggable
    }

    console.log("UPMARKER ---> ",   upMarker);

    const newLat = $event.coords.lat;
    const newLng = $event.coords.lng;

    this.markerService.updateMarker(upMarker,index, newLat, newLng);

  }

  removeMarker(marker: any, index: number) {
    console.log('Removing marker...');
    this.markers.splice(index,1);
    this.markerService.removeMarker(index);
  }

}
