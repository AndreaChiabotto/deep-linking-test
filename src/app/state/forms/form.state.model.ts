import { ValidationErrors } from '@angular/forms';

export interface FormsStateModel {
  firstForm: {
    model: firstFormData;
    dirty: boolean;
    status: string;
    errors: ValidationErrors | undefined;
  };
  secondForm: {
    model: secondFormData;
    dirty: boolean;
    status: string;
    errors: ValidationErrors | undefined;
  };
  thirdForm: {
    model: thirdFormData;
    dirty: boolean;
    status: string;
    errors: ValidationErrors | undefined;
  };
}

export interface firstFormData {
  vorname?: string ;
  nachname?: string ;
  alter?: string ;
}

export interface secondFormData {
  eMail?: string ;
  strasse?: string;
  strasseNr?: string;
  plz?: number;
  stadt?: string;
}

export interface thirdFormData {
  schaden?: string;
  files?: string;
}


export const initializeFormsStateModel: () => FormsStateModel = () => ({
  firstForm: {
    model: {
      vorname:  undefined,
      nachname: undefined,
      alter: undefined,
    },
    dirty: false,
    status: '',
    errors: {},
  },
  secondForm: {
    model: {
      email: undefined,
      strasse: undefined,
      strasseNr: undefined,
      plz: undefined,
      stadt: undefined
    },
    dirty: false,
    status: '',
    errors: {},
  },
  thirdForm: {
    model: {
      schaden: undefined,
      files: undefined
    },
    dirty: false,
    status: '',
    errors: {},
  }
});
