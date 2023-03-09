export interface Componente {
    icon: string,
    name: string,
    redirectTo: string;
}

export interface IPago {
    name: string,
    stic_payments_stic_registrations_name: string,
    status: string,
    payment_type: string,
    amount: string,
    payment_method: string
}

export interface ISession {
    start_date: string,
    end_date: string,
    name: string,
    description: string
}

export interface IActividad {
    name: string,
    type: string,
    start_date: string,
    end_date: string,
    start_inscripcion_c: string,
    end_inscripcion_c: string,
    description: string,
}

export interface IInscripcion {
    stic_registrations_stic_events_name: string,
    stic_registrations_contacts_name: string,
    registration_date: string,
    ccjdbe_color_prenda_c: string,
    ccjdbe_talla_c: string
}

export interface IAsistencia {
    start_date: string,
    duration: string,
    status: string,
    description: string,
    stic_attendances_stic_registrations_name: string,
    stic_attendances_stic_sessions_name: string
}

export interface IDocumento {
    filename: string,
    status_id: string,
    category_id: string,
    description: string
}

export interface IParticipante {
    first_name: string,
    last_name: string,
    stic_identification_type_c: string,
    stic_identification_number_c: string,
    stic_gender_c: string,
    birthdate: string,
    email1: string,
    curso_escolar_c: string
    bosco_descripcio_allergies_c: string,
    bosco_descripcio_intoler_c: string,
    bosco_descripcio_tratam_c: string,
    bosco_descripcio_enfermed_c: string,
    bosco_descripcio_otros_c: string
}

export interface IDato {
    first_name: string,
    last_name: string,
    stic_identification_type_c: string,
    stic_identification_number_c: string,
    stic_gender_c: string,
    birthdate: string,
    email1: string,
    curso_escolar_c: string
    bosco_tipovia_c: string,
    primary_address_street: string,
    primary_address_city: string,
    primary_address_state: string,
    primary_address_postalcode: string
}