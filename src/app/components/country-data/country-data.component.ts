import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.scss']
})
export class CountryDataComponent implements OnInit {

  @Input() data: CountryStats;

  edit = false;

  oldData: CountryStats;

  statsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.statsForm = this.fb.group({
      activeCases: [this.data.cases.active, [Validators.min(0), Validators.pattern('^\\d*$')]],
      recoveredCases: [this.data.cases.recovered, [Validators.min(0), Validators.pattern('^\\d*$')]],
      deaths: [this.data.deaths.total, [Validators.min(0), Validators.pattern('^\\d*$')]],
      tests: [this.data.tests.total, [Validators.min(0), Validators.pattern('^\\d*$')]]
    });
  }

  save() {

    this.oldData = this.data;

    const formData = this.statsForm.value;
    this.data.cases.active = formData.activeCases;
    this.data.cases.recovered = formData.recoveredCases;
    this.data.cases.total = Number(formData.activeCases) + Number(formData.recoveredCases) + Number(formData.deaths);
    this.data.deaths.total = formData.deaths;
    this.data.tests.total = formData.tests;

    this.statsService.updateStatsCountry(this.data)
    .subscribe((resp: RestResponse) => {
      if (resp.ok) {
        this.edit = false;
        console.log(resp.message);
      } else {
        this.data = this.oldData;
      }
    }, (err) => {
      this.data = this.oldData;
      this.edit = false;
      console.log(err);
    });
  }

}
