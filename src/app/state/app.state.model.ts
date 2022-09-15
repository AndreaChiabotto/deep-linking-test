/**
 * Interface to describe the full state. This can be used as Datatype inside @Select.
 */
import {FormsStateModel, initializeFormsStateModel} from "./forms/form.state.model";


export interface AppStateModel {
  formsStateModel: FormsStateModel;
}

export const initializeAppStateModel: () => AppStateModel = () => ({
  formsStateModel: initializeFormsStateModel(),
});
