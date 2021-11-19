import { Joueur } from "./Joueur";
import { Tour } from "./Tour";

export interface Rencontre {
  id?: number,
  j1?: Joueur,
  j2?: Joueur,
  nbTours?: number,
  scoreJ1?: number,
  scoreJ2?: number,
  tours?: Tour[]
}
