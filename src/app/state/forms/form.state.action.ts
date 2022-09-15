import {FormsStateModel} from "./form.state.model";

const TYPE_PREFIX: string = '[STATE]:';

export namespace Forms {

  export class GetState {
    public static readonly type: string = `${TYPE_PREFIX} get the entire State`;
  }

  export class SetState {
    public static readonly type: string = `${TYPE_PREFIX} set State from param`;
    constructor(public variant: FormsStateModel) {}
  }

}
