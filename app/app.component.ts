import { Component, ElementRef, ViewChild } from "@angular/core";
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App" class="action-bar"></ActionBar>
    <GridLayout>
    	<MapView #mapView [latitude]="latitude" [longitude]="longitude"
             [zoom]="zoom" [bearing]="bearing"
             [tilt]="tilt" i-padding="50,50,50,50" [padding]="padding" (mapReady)="onMapReady($event)"
             (markerSelect)="onMarkerEvent($event)" (markerBeginDragging)="onMarkerEvent($event)"
             (markerEndDragging)="onMarkerEvent($event)" (markerDrag)="onMarkerEvent($event)"
             (markerInfoWindowTapped)="onMarkerEvent($event)" (coordinateTapped)="onCoordinateTapped($event)"
             (cameraChanged)="onCameraChanged($event)"></MapView>

    </GridLayout>
  `
})
export class AppComponent {

  latitude =  -33.86;
    longitude = 151.20;
    zoom = 8;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(-33.86, 151.20);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
}
