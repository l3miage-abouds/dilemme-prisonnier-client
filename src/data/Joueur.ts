export interface Joueur {
  numJoueur: number,
  username: string,
  strategie: ChoixStrategie,
  coupsPrecedents: ChoixStrategie[]
}
