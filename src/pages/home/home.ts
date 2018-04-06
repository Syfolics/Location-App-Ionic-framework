import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Destination:string = '';
  MyLocation: any;

  //constructor(public navCtrl: NavController) {}
  constructor(public alertCtrl: AlertController,public toastCtrl: ToastController) { }
  
  
  
  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: -29.8533980, lng: 31.0226509}
    });
    directionsDisplay.setMap(map);

   

    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(function(position) 
      {
        var pos =
       {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

       /* var dest=
        {
          lat: position.coords.latitude,
          long:position.coords.longitude
        };

        that.Destination=new google.map.LatLng(dest);
*/
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
    origin: this.MyLocation,
    
    travelMode: 'DRIVING'
  }, 
  
  function(response, status) 
  {
    if (status === 'OK') 
    {
      directionsDisplay.setDirections(response);
    } else 
    {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
doPrompt() {
  
  let prompt = this.alertCtrl.create({
    title: 'Login',
    message: "Enter a name for this new album you're so keen on adding",
    inputs: [
      {
        name : this.Destination,
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log("calculateAndDisplayRoute()");
        }
      }
    ]
  });
  prompt.present();
}

showToastWithCloseButton() {
  const toast = this.toastCtrl.create({
    message: 'Locating your destination',
    showCloseButton: true,
    closeButtonText: 'Ok'
  });
  toast.present();
}

}
