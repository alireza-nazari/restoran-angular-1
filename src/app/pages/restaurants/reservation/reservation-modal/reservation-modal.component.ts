import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorHelper } from '../../../../core/helpers/validator.helper';
import { ValidateService } from '../../../../core/services/validate.service';
import { ReservationService } from '../../../../core/services/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public occasions: FormControl;
  public message: FormControl;
  public reservationForms: FormGroup;
  private restaurant_id: object;

  public celebrations = [
    {value: 'birthday', name: 'Birthday'},
    {value: 'anniversary', name: 'Anniversary'},
    {value: 'date-night', name: 'Date night'},
    {value: 'business-meal', name: 'Business meal'},
    {value: 'celebration', name: 'Celebration'},
  ];

  constructor(private reservationServic: ReservationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restaurant_id = this.route.snapshot.params.id;
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.surname = new FormControl('', [
      Validators.pattern(ValidatorHelper.nameRegEx)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorHelper.emailRegEx),
    ]);
    this.phone = new FormControl('', Validators.required);
    this.message = new FormControl('');
    this.occasions = new FormControl(null);
  }

  private createForm(): void {
    this.reservationForms = new FormGroup({
      'name': this.name,
      'surname': this.surname,
      'email': this.email,
      'phone': this.phone,
      'occasions': this.occasions,
      'message': this.message,
    });
  }

  public alertValidate(event) {
    ValidateService.alertValidate(event, this.reservationForms);
  }

  public submitReservationForm() {
    if (this.reservationForms.invalid) {
      ValidateService.validateAllFormFields(this.reservationForms);
    } else {
      const data = ReservationService.request;
      const req = this.reservationForms.getRawValue();
      ReservationService.request = {
        ...data,
        ...req,
        restaurant_id: this.restaurant_id
      };
      console.log(ReservationService.request);
    }
  }
}
