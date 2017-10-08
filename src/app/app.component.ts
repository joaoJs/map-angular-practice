import { Component } from '@angular/core';
import { MarkerService } from './services/marker.service';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  markers: any[];

  color: string = 'rgb(255,0,0)';

  colorNew: string = 'rgb(0,0,255)';

  locationName: string = "";

  destinationName: string = "";

  data: any = {};

  allDistances: number[] = [];

  sortedDistances: number[] = [];

  closestMessageOrigin: string = '';

  closestMessageDest: string = '';

  closestStOr: string = '';

  closestStDest: string = '';

  locOr: string = '';

  latOr: number;

  lngOr: number;

  coords: string = '';

  latDest: number;

  lngDest: number;

  locDest: string = '';

  sortedDistancesOr: number[] = [];

  sortedDistancesDest: number[] = [];

  indexOr: number;

  indexDest: number;

  closestStOrLat: number;

  closestStOrLng: number;

  closestStDestLat: number;

  closestStDestLng: number;


  constructor(
    private markerService: MarkerService
  ) {
    this.markers = this.markerService.getMarkers();
  }

  title = 'app';
  lat: number = 25.7617;
  lng: number = -80.1918;
  zoom: number = 10;

  stationsObj: any = {
    0: "Miami Zoo",
    1: "West Perrine Park",
    2: "Jackson South Medical Center",
    3: "The Falls",
    4: "Dadeland South",
    5: "Dadeland North",
    6: "South Miami",
    7: "University",
    8: "Douglas Road",
    9: "Coconut Grove",
    10: "Vizcaya",
    11: "Brickell",
    12: "Government Center",
    13: "Historic Overtown",
    14: "Wynwood Walls",
    15: "Buena Vista Blvd",
    16: "Design District"
  }

   stations: any[] = [
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

   newStations: any[] = [
      {lat: 25.6850431, lng: -80.3136722},
      {lat: 25.644235, lng: -80.3383722},
      {lat: 25.6298189, lng: -80.3457406},
      {lat: 25.6104121, lng: -80.359949},
      {lat: 25.6071269, lng: -80.39927949999999}
    ]

    newStationsNorth: any[] = [
      {lat: 25.7810171, lng: -80.19628360000002},
      {lat: 25.8011729, lng: -80.20023049999999},
      {lat: 25.8081475, lng: -80.1936675},
      {lat: 25.8134218, lng: -80.1934285}
    ]

    allStations: any[] = [
      {lat: 25.6071269, lng: -80.39927949999999},
      {lat: 25.6104121, lng: -80.359949},
      {lat: 25.6298189, lng: -80.3457406},
      {lat: 25.644235, lng: -80.3383722},
      {lat: 25.6850431, lng: -80.3136722},
      {lat: 25.6919369, lng: -80.3051089},
      {lat: 25.7050916, lng: -80.2890178},
      {lat: 25.7148675, lng: -80.2770295},
      {lat: 25.7327736, lng: -80.25486269999999},
      {lat: 25.7397915, lng: -80.2388733},
      {lat: 25.7497383, lng: -80.211783},
      {lat: 25.7638502, lng: -80.195425},
      {lat: 25.776034, lng: -80.196061},
      {lat: 25.7810171, lng: -80.19628360000002},
      {lat: 25.8011729, lng: -80.20023049999999},
      {lat: 25.8081475, lng: -80.1936675},
      {lat: 25.8134218, lng: -80.1934285}
    ];

  newMarker: any = {};

  markerName: string = "";
  markerLat: string = "";
  markerLng: string = "";
  //markerDraggable: string = "No";

  markerClicked(marker: any, index: number) {
    console.log(marker.name + " was clicked at " + index + " position.");
  }

  mapClicked($event: any) {
    console.log('clicked');
    this.newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng
      //draggable: false
    }

  this.markers.push(this.newMarker);
  }

  addMarker(location: string, lat: number, lng: number) {
    console.log('Adding Marker.');
    // let bool = false;
    // if (this.markerDraggable === 'Yes') {
    //   bool = true;
    // } else {
    //   bool = false;
    // }
    this.newMarker = {
      name: location,
      lat: lat,
      lng: lng
      //draggable: bool
    }

    this.markers.push(this.newMarker);
    this.markerService.addMarker(this.newMarker);
  }

  markerDragEnd(marker: any,index: number, $event: any) {
    console.log('Dragend -> ', marker, $event);

    const upMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng)
      //draggable: marker.draggable
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


  submitLocations() {

    this.markerService.getOrigin(this.locationName)
      .subscribe(
        (response) => {
          console.log('response Origin --> ', response);
          this.locOr = response['results'][0].formatted_address;
          this.latOr = response['results'][0].geometry.location.lat;
          this.lngOr = response['results'][0].geometry.location.lng;
          this.addMarker(this.locOr,this.latOr,this.lngOr);
          this.coords = this.allStations.map(s => s.lat + ',' + s.lng).join('|');

          this.markerService.getDistance(String(this.latOr), String(this.lngOr), this.coords)
            .subscribe(
              (data) => {
                console.log("distances ---> ", data);
                console.log("dist array --> ", data['rows'][0].elements);
                // get array of distances from response
                const distArray = data['rows'][0].elements;
                // sort array of distances, and pair the distances with their index
                this.sortedDistancesOr = distArray.map((d,i) => [Number((d.distance.text).slice(0,-3)), i])
                  .sort((a,b) => a[0] - b[0]);
                this.indexOr = this.sortedDistancesOr[0][1];
                this.closestStOr = this.stationsObj[this.indexOr];
                this.closestMessageOrigin = `The closest station to your origin is ${this.closestStOr} and the distance is ${this.sortedDistancesOr[0][0]} km.`;

                this.markerService.getDestination(this.destinationName)
                  .subscribe(
                    (response) => {
                      this.locDest = response['results'][0].formatted_address;
                      this.latDest = response['results'][0].geometry.location.lat;
                      this.lngDest = response['results'][0].geometry.location.lng;
                      this.addMarker(this.locDest,this.latDest,this.lngDest);
                      //const coords = this.allStations.map(s => s.lat + ',' + s.lng).join('|');
                      console.log(this.coords);
                      this.markerService.getDistance(String(this.latDest), String(this.lngDest), this.coords)
                        .subscribe(
                          (data) => {
                            console.log("distances Destination ---> ", data);
                            console.log("dist array Dest --> ", data['rows'][0].elements);
                            const distArray = data['rows'][0].elements;
                            this.sortedDistancesDest = distArray.map((d,i) => [Number((d.distance.text).slice(0,-3)), i])
                              .sort((a,b) => a[0] - b[0]);
                            this.indexDest = this.sortedDistancesDest[0][1];
                            this.closestStDest = this.stationsObj[this.indexDest];
                            this.closestMessageDest = `The closest station to your destination is ${this.closestStDest} and the distance is ${this.sortedDistancesDest[0][0]} km.`;

                            console.log('BOTH!!! HERE!!! ---> ', this.closestStOr, this.closestStDest);

                            // now we need to get the closest stations' lat and lng
                            this.closestStOrLat = this.allStations[this.indexOr]['lat'];
                            this.closestStOrLng = this.allStations[this.indexOr]['lng'];
                            this.closestStDestLat = this.allStations[this.indexDest]['lat'];
                            this.closestStDestLng = this.allStations[this.indexDest]['lng'];

                            console.log("closest Station origin lat ---> ", this.closestStOrLat);
                            // now we need to query the distance between metro stations
                            // but first we need to format the destination's coords
                            const destCoords = this.closestStDestLat + ',' + this.closestStDestLng;

                            /*this.markerService.getDistanceMetro(String(this.closestStOrLat), String(this.closestStOrLng), destCoords)
                              .subscribe(
                                (data) => {
                                  console.log('HUala!! --> ', data);
                                },
                                (err) => {
                                  console.log('err ---> ', err);
                                }
                              )*/
                              const stA = new google.maps.LatLng(this.closestStOrLat, this.closestStOrLng);
                              const stB = new google.maps.LatLng(this.closestStDestLat, this.closestStDestLng);
                              const distance = google.maps.geometry.spherical.computeDistanceBetween(stA, stB);
                              console.log("NYC --> ", distance);

                          },
                          (err) => {
                            console.log("err --> ", err);
                          }
                        )
                    },
                    (err) => {
                      console.log(err);
                    }
                  )
              },
              (err) => {
                console.log("err --> ", err);
              }
            )
        },
        (err) => {
          console.log('err --> ', err);
        }
      )





      /*  above is the test. Underneath is the original */

  //function submitOrigin() {
  /*  this.markerService.getOrigin(this.locationName)
      .subscribe(
        (response) => {
          const loc = response['results'][0].formatted_address;
          const lat = response['results'][0].geometry.location.lat;
          const lng = response['results'][0].geometry.location.lng;
          this.addMarker(loc,lat,lng);
          // find closest station from origin and display distance
          //const allStations = this.newStations.concat(this.newStationsNorth).concat(this.stations);
          const coords = this.allStations.map(s => s.lat + ',' + s.lng).join('|');
          console.log(coords);
          //console.log(coords.join('|'));
          this.markerService.getDistance(String(lat), String(lng), coords)
            .subscribe(
              (data) => {
                console.log("distances ---> ", data);
                console.log("dist array --> ", data['rows'][0].elements);
                // get array of distances from response
                const distArray = data['rows'][0].elements;
                // sort array of distances, and pair the distances with their index
                this.sortedDistances = distArray.map((d,i) => [Number((d.distance.text).slice(0,-3)), i])
                  .sort((a,b) => a[0] - b[0]);
                //const closestSt = this.stationsObj[this.sortedDistances[0][1]];
                this.closestMessageOrigin = `The closest station to your origin is ${this.stationsObj[this.sortedDistances[0][1]]} and the distance is ${this.sortedDistances[0][0]} km.`;
              },
              (err) => {
                console.log("err --> ", err);
              }
            )
          // allStations.forEach(s=> {
          //   this.markerService.getDistance(String(lat),String(lng),String(s.lat), String(s.lng))
          //     .subscribe(
          //       (data) => {
          //         console.log("Distance data! ---> ", data);
          //         console.log('Distance --> ', data['rows'][0].elements[0].distance.text);
          //         const dist = (data['rows'][0].elements[0].distance.text).slice(0,-3);
          //         console.log("Dist ---> ", dist);
          //         this.allDistances.push(Number(data['rows'][0].elements[0].distance.text));
          //       },
          //       (err) => {
          //         console.log(err);
          //       }
          //     )
          // });
        },
        (err) => {
          console.log(err);
        }
      ) */
  //}

  //function submitDestination() {
  /*  this.markerService.getDestination(this.destinationName)
      .subscribe(
        (response) => {
          const loc = response['results'][0].formatted_address;
          const lat = response['results'][0].geometry.location.lat;
          const lng = response['results'][0].geometry.location.lng;
          this.addMarker(loc,lat,lng);
          const coords = this.allStations.map(s => s.lat + ',' + s.lng).join('|');
          console.log(coords);
          this.markerService.getDistance(String(lat), String(lng), coords)
            .subscribe(
              (data) => {
                console.log("distances ---> ", data);
                console.log("dist array --> ", data['rows'][0].elements);
                const distArray = data['rows'][0].elements;
                this.sortedDistances = distArray.map((d,i) => [Number((d.distance.text).slice(0,-3)), i])
                  .sort((a,b) => a[0] - b[0]);
                this.closestMessageDest = `The closest station to your destination is ${this.stationsObj[this.sortedDistances[0][1]]} and the distance is ${this.sortedDistances[0][0]} km.`;
              },
              (err) => {
                console.log("err --> ", err);
              }
            )
        },
        (err) => {
          console.log(err);
        }
      ) 263 */
  //}

  }

}
