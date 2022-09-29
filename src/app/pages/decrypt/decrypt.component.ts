import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FormsState} from "../../state/forms/form.state";
import { combineLatest,
  map,
  mergeMap,
  Observable,
  of,
} from "rxjs";
import {FormsStateModel} from "../../state/forms/form.state.model";
import {DeepLinkGeneratorService} from "../../shared/deep-link-generator/deep-link-generator.service";
import {ActivatedRoute} from "@angular/router";

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
          this.encryptedState = params['s'];
          console.log(this.encryptedState);
        }
      );
  }

  public decrypt(): void {
    console.log(this.encryptedState,  this.enigma.get('decrypt')?.value);
console.log(this.urlGenerator.decryptUrl(JSON.stringify( this.encryptedState ), this.enigma.get('decrypt')?.value))
  }
}
