import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FormsState} from "../../state/forms/form.state";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {FormsStateModel} from "../../state/forms/form.state.model";
import {DeepLinkGeneratorService} from "../../shared/deep-link-generator/deep-link-generator.service";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html'
})
export class Page1Component implements OnInit {
  public firstForm: UntypedFormGroup;
  public secondForm: UntypedFormGroup;
  public thirdForm: UntypedFormGroup;

  public state: string = '';
  public encryptedUrl: string = '';
  public secretKey: string = '';
  public url$: Observable<string> = of('');
  public urlAsString:string='';

  @Select(FormsState.getFormState) public state$?: Observable<FormsStateModel>;

  constructor(private readonly formBuilder: UntypedFormBuilder,
              private readonly store: Store,
              private readonly urlGenerator: DeepLinkGeneratorService) {

    this.firstForm = this.formBuilder.group({
      vorname: new UntypedFormControl('', []),
      nachname: new UntypedFormControl('', []),
      alter: new UntypedFormControl('', []),
    });

    this.secondForm = this.formBuilder.group({
      email: new UntypedFormControl('', []),
      strasse: new UntypedFormControl('', []),
      strasseNr: new UntypedFormControl('', []),
      plz: new UntypedFormControl('', []),
      stadt: new UntypedFormControl('', []),
    });

    this.thirdForm = this.formBuilder.group({
      schaden: new UntypedFormControl('', []),
      files: new UntypedFormControl('', []),
    });
  }

  public ngOnInit(): void {
    this.state$?.pipe(
      tap((state) => {

        const {
          encrypted,
          key
        }: { encrypted: string, key: string } = this.urlGenerator.generateUrl(JSON.stringify(state));

        this.encryptedUrl = encrypted;
        this.secretKey = key;
        this.url$ = this.urlGenerator.minifyUrl(`https://www.generali.de/enigma/"${this.encryptedUrl}"`)
      })
    ).subscribe();



    this.url$.subscribe(e => {
      this.urlAsString = e;
      console.log('subscribe url: ', e)
    });
  }

  public navigate(): void {
    this.store.dispatch(new Navigate(['page2']));
  }
}
