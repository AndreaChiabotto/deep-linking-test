import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FormsState} from "../../state/forms/form.state";
import {
  BehaviorSubject, combineLatest, combineLatestWith,
  concat,
  debounce,
  flatMap,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
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
  public encryptedState: string = '';
  public secretKey: string = '';
  public url: string = '';

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
    // @ts-ignore

    this.state$?.pipe(
      map(state => this.urlGenerator.generateUrl(JSON.stringify(state))),
      mergeMap(obj => {
        return combineLatest(
          of(obj),
          this.urlGenerator.minifyUrl(`https:/www.test.de/${obj.encrypted}`))
      }),
      map(obj => ( {encryptedState: obj[0].encrypted, key: obj[0].key, url: obj[1]}))
    ).subscribe(e => {
      this.secretKey = e.key;
      this.encryptedState = e.encryptedState
      this.url = e.url;
      }
    );
  }

  public navigate(): void {
    this.store.dispatch(new Navigate(['page2']));
  }
}
