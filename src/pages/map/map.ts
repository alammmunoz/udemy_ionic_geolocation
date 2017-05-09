import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMaps, Geolocation]
})
export class Map {

  public map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public googleMaps: GoogleMaps, private platform: Platform,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
    this.platform.ready().then(()=>{
      this.googleMaps.isAvailable().then(()=>{
        let element: HTMLElement = document.getElementById('map');
        this.map = this.googleMaps.create(element);
        this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
          // let's center map based on our position
          this.geolocation.getCurrentPosition().then(position => {
            let myPosition = new LatLng(position.coords.latitude, position.coords.longitude);
            this.map.animateCamera({target: myPosition, zoom: 10});
            this.map.addMarker({
              position: myPosition,
              title: 'You are here Dude!'
            });
          })
          // let myPosition: LatLng = new LatLng(41.390295, 2.154007);
          
        })
      }).catch(
        ()=>alert("GoogleMap is not avalaible")
      );
    })
  }

}
