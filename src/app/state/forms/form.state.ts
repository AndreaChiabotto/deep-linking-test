import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import {Forms} from './form.state.action';
import {
  FormsStateModel,
  initializeFormsStateModel
} from './form.state.model';

const stateNameModelName: string = 'formsStateModel';

@State<FormsStateModel>({
  name: stateNameModelName,
  defaults: initializeFormsStateModel(),
})
@Injectable()
export class FormsState {

  @Selector()
  public static getFormState(state: FormsStateModel): FormsStateModel {
    return state;
  }


  @Action(Forms.SetState)
  public setformStateModel(
    { setState }: StateContext<FormsStateModel>,
    { variant }: Forms.SetState
  ): void {

    console.log('action here:', variant);
    setState((state: FormsStateModel) => {
      state.firstForm = variant.firstForm;
      state.secondForm = variant.secondForm;
      state.thirdForm = variant.thirdForm;
      return state;
    });
  }
}
