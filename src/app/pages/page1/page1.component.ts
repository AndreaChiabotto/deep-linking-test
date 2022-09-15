import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html'
})
export class Page1Component {
  public firstForm: FormGroup;
  public secondForm: FormGroup;
  public thirdForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly store:Store) {

    this.firstForm = this.formBuilder.group({
      vorname: new FormControl('', []),
      nachname: new FormControl('', []),
      alter: new FormControl('', []),
    });

    this.secondForm = this.formBuilder.group({
      email: new FormControl('', []),
      strasse: new FormControl('', []),
      strasseNr: new FormControl('', []),
      plz: new FormControl('', []),
      stadt: new FormControl('', []),
    });

    this.thirdForm = this.formBuilder.group({
      schaden: new FormControl('', []),
      files: new FormControl('', []),
    });
  }

  public navigate():void {
    this.store.dispatch(new Navigate(['page2']));
  }
}
