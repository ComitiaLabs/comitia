interface PatientSchema {
    $schema?: string;
    id?: string;
    patient?: Patient;
    patient_contact?: PatientContact;
    patient_communication?: PatientCommunication;
    patient_link?: PatientLink
  }

  interface Patient{
    resourceType: string;
    id?: string;
    meta?: string;
    implicitRules?: string;
    _implicitRules?: string;
    language?: string;
    _language?: string;
    text?: string;
    contained?: string[];
    extension?: string[];
    modifierExtension?: string[];
    identifier?: string[];
    active?: string;
    _active?: string;
    name?: string[];
    telecom?: string[];
    gender?: string;
    _gender?: string;
    birthDate?: Date;
    _birthDate?: Date;
    deceasedBoolean?: boolean;
    _deceasedBoolean?: boolean;
    deceasedDateTime?: Date;
    _deceasedDateTime?: Date;
    address?: string[];
    maritalStatus?: string;
    multipleBirthBoolean?: boolean;
    _multipleBirthBoolean?: string;
    multipleBirthInteger?: number;
    photo?: string;
    contact?: string[];
    communication?: string[];
    generalPractitioner?: string[];
    managingOrganization?: string;
    link?: string[];   
  }
  
  interface PatientContact {
    id?: string;
    extension?: string[];
    modifierExtension?: string[];
    relationship?: string[];
    name?: string;
    telecom?: string[];
    address?: string;
    gender?: string;
    _gender?: string;
    organization?: string;
    period?: string;
  }
  
  interface PatientCommunication {
    id?: string;
    extension?: string[];
    modifierExtension?: string[];
    language: string[];
    preferred?: boolean;
    _preferred?: string;
  }
  
  interface PatientLink {
    id?: string;
    extension?: string[];
    modifierExtension?: string[];
    other: string;
    type?: string;
    _type?: string;
  }
