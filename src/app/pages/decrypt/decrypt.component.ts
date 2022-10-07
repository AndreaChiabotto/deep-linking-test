import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FormsState} from "../../state/forms/form.state";
import {
  combineLatest,
  map,
  mergeMap,
  Observable,
  of,
} from "rxjs";
import {FormsStateModel} from "../../state/forms/form.state.model";
import {DeepLinkGeneratorService} from "../../shared/deep-link-generator/deep-link-generator.service";
import {ActivatedRoute} from "@angular/router";
import {Forms} from "../../state/forms/form.state.action";
import SetState = Forms.SetState;

@Component({
  selector: 'app-page1',
  templateUrl: './decrypt.component.html'
})
export class DecryptComponent implements OnInit {
  public enigma: UntypedFormGroup;

  private encryptedState: string = '';


  @Select(FormsState.getFormState) public state$?: Observable<FormsStateModel>;

  constructor(private readonly formBuilder: UntypedFormBuilder,
              private readonly store: Store,
              private route: ActivatedRoute,
              private readonly urlGenerator: DeepLinkGeneratorService) {
    this.enigma = this.formBuilder.group({
      decrypt: new UntypedFormControl('', []),
    });
  }

  public ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.encryptedState = decodeURIComponent(params['s']);
        }
      );
  }

  public decrypt(): void {
    const stateAsString: string = this.urlGenerator.decryptUrl(this.encryptedState, this.enigma.get('decrypt')?.value);
    const newState: FormsStateModel = JSON.parse(stateAsString);

    this.store.dispatch(new SetState(newState));
    this.store.dispatch(new Navigate(['page1']));
  }
}
