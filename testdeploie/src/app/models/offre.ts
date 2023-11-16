export class Offresemploi {
    id!: number
    nomOffre!: string
    confirmer: boolean = false
    email!: string
    localisation!: string
    typeOffre!: TypeOffre
    description!: string
    urlCandidature!: string
    dateCreation: any
    dateLimite!: string
    dateFonction!: string
    nomEntreprise!: string
    site!: string
    urlFacebook!: string
    urlTwitter!: string
    urlLinkdin!: string
    logo!: string
    path!: string
    categorie!: string
    utilisateur!: string
    averageRating!: number
    ratings!: string
}

export enum TypeOffre {
    A_distance,
    Avis_de_concours,
    Avis_de_formation,
    CDD,
    CDI,
    NA,
    Mission,
    Stage,
    Temporaire,
    Temps_partiel,
    Temps_plein
  }