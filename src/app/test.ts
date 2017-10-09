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
            this.closestStOr = this.stationsObj[this.sortedDistancesOr[0][1]];
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
                        this.closestStDest = this.stationsObj[this.sortedDistancesDest[0][1]]
                        this.closestMessageDest = `The closest station to your destination is ${this.closestStDest} and the distance is ${this.sortedDistancesDest[0][0]} km.`;

                        //console.log('BOTH!!! HERE!!! ---> ', this.closestStOr, this.closestStDest);
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


/*

Data for stations model.

Distances.

 0 - 1 --> 3965.0607739911657

 1 - 2 --> 2588.6435220066046

 2 - 3 --> 1766.9788734494489

 3 - 4 --> 5174.801754946771

 4 - 5 --> 1151.9046000681071

 5 - 6 --> 2179.366329036528

 6 - 7 --> 15535.202538687874

 7 - 8 --> 20139.1738466162

 8 - 9 --> 1783.5647563096068

 9 - 10 --> 2933.348538064533

 10 - 11 --> 2271.02809886992

 11 - 12 --> 1357.7921838766856

 12 - 13 --> 555.1647618017228

 13 - 14 --> 2278.341256191722

 14 - 15 --> 1017.56076304776

 15 - 16 --> 587.620711041291





 function getMiles(i) {
     return i*0.000621371192;
}
function getMeters(i) {
     return i*1609.344;
}

*/
