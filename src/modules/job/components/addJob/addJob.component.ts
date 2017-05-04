
import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { OT_ACTIONS } from '../../../occurenceType/store/occurenceType.actions';
import { AREA_ACTIONS } from '../../../area/store/area.actions';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { MessageService } from '../../../../app/core/services/index';

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
  area: any[] = [];
  asyncdepartment: Observable<any>;
  asyncArea: Observable<any>;
  occurrenceTypes: any[] = [];
  asyncOT: Observable<any>
  jobForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public location: string = '';
  depError: boolean = false;
  remarkError: boolean = false;
  timeError: boolean = false;
  reportError: boolean = false;
  catError: boolean = false;
  areaError: boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(private store: Store<any>, private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private _zone: NgZone,
    private ref: ChangeDetectorRef,
    private jobService: JobService,
    private messageService: MessageService,
    private route: ActivatedRoute, private router: Router) { }

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
      areaID: ['', [Validators.required]],
      departmentID: ['', [Validators.required]],
      obTypeID: ['', [Validators.required]],
      obTime: ['', [Validators.required]],
      natureOfOccurrence: ['', [Validators.required]],
      remark: [''],
    });
    this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
    this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST });

    this.asyncArea = this.store.select('area');
    this.asyncArea.subscribe((res: any) => {
      this.area = res;
    });
    this.asyncdepartment = this.store.select('department');
    this.asyncdepartment.subscribe((res: any) => {
      this.departments = res;
    });
    this.asyncOT = this.store.select('occurenceType');
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
            this.location = place.formatted_address;
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





  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!this.validate(value)) {
      let payload = {
        "areaID": value.areaID,
        "obTypeID": value.obTypeID,
        "departmentID": value.departmentID,
        "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad",
        "obNumber": "456789",
        "obTime": value.obTime,
        "caseFileNumber": "2",
        "natureOfOccurrence": value.natureOfOccurrence,
        "remark": value.remark,
        "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
        "assignedComments": "123",
        "mapZoomLevel": 12,
        "lattitude": this.latitude,
        "longitude": this.longitude,
        "location": this.location,
        "assignedTime": "2017-05-03T15:04:23.5032781",
        "priority": 2
      }

      this.jobService.addJob(payload).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Occurence Book Saved' });
        this.router.navigate(['/jobs/jobDetails']);
      })
    }

  }
  validate(value: any) {
    let submitFlag = false;
    if (value.areaID === "" || value.areaID === undefined) {
      submitFlag = true;
      this.areaError = true;
    } else { this.areaError = false; }
    if (value.departmentID === "" || value.departmentID === undefined) {
      submitFlag = true;
      this.depError = true;
    } else { this.depError = false; }
    if (value.obTypeID === "" || value.obTypeID === undefined) {
      submitFlag = true;
      this.catError = true;
    } else { this.catError = false; }
    if (value.natureOfOccurrence === "" || value.natureOfOccurrence === undefined) {
      submitFlag = true;
      this.reportError = true;
    } else { this.reportError = false; }
    if (value.obTime === "" || value.obTime === undefined) {
      submitFlag = true;
      this.timeError = true;
    } else { this.timeError = false; }
    if (value.remark === "" || value.remark === undefined) {
      submitFlag = true;
      this.remarkError = true;
    } else { this.remarkError = false; }
    return submitFlag;
  }
}
