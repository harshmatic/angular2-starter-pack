<<<<<<< HEAD
import { Component, OnInit, AfterViewInit } from '@angular/core';
=======
import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { OT_ACTIONS } from '../../../occurenceType/store/occurenceType.actions';
import { JobService } from '../../services/job.service';
<<<<<<< HEAD

=======
import { MapsAPILoader } from '@agm/core';
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'addJob.component.html',

})
export class AddJobComponent implements OnInit {
  departments: any[] = [];
  asyncdepartment: Observable<any>;
  occurrenceTypes: any[] = [];
<<<<<<< HEAD
  asyncOT: Observable<any>;
=======
  asyncOT: Observable<any>
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
  jobForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(private store: Store<any>, private formBuilder: FormBuilder,
<<<<<<< HEAD
=======
    private mapsAPILoader: MapsAPILoader,
    private _zone: NgZone,
    private ref: ChangeDetectorRef,
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
    private jobService: JobService) { }

  ngOnInit() {
    this.zoom = 11;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    this.jobForm = this.formBuilder.group({
      Id: [null],
      departmentID: ['', [Validators.required]],
      obTypeID: ['', [Validators.required]],
      obTime: ['', [Validators.required]],
      natureOfOccurrence: ['', [Validators.required]],
      remark: [''],
    });
    this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST });

<<<<<<< HEAD
    this.asyncdepartment = this.store.select('department');
    this.asyncdepartment.subscribe((res: any) => {
      this.departments = res;
    });
    this.asyncOT = this.store.select('occurenceType');
    this.asyncOT.subscribe((res: any) => {
      this.occurrenceTypes = res;
    });
  }

=======
    this.asyncdepartment = this.store.select('department')
    this.asyncdepartment.subscribe((res: any) => {
      this.departments = res;
    });
    this.asyncOT = this.store.select('occurenceType')
    this.asyncOT.subscribe((res: any) => {
      this.occurrenceTypes = res;
    });

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        ;
        this._zone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            alert("Place Not found");
            return;
          } else {


            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
            this.ref.markForCheck();

          }

        });
      });
    });

  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  markerDragEnd(lat: number, lng: number) {
    this._zone.run(() => {
      this.latitude = lat;
      this.longitude = lng;
      this.ref.markForCheck();

    });
  }


>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    let payload = {
      "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
      "obNumber": "987",
      "departmentID": value.departmentID,
      "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401",
      "natureOfOccurrence": value.natureOfOccurrence,
      "obTime": "2017-04-10T19:25:14.9100866",
      "obTypeID": value.obTypeID,
      "caseFileNumber": "2",
      "remark": value.remark,
      "lattitude": 18.550335,
      "longitude": 73.809956,
      "assignedTime": "2017-04-27T06:24:58.6589837",
      "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
      "assignedComments": "Assigned to SAIG in CID",
      "mapZoomLevel": 11,
      "location": "Near IARIRS Baner"
    }
    this.jobService.addJob(payload).subscribe(res => {
<<<<<<< HEAD
      console.log('Done');
=======
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
    })
  }
}
