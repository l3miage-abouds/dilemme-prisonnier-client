import { Choix } from "./Choix";
import { ChoixStrategie } from "./ChoixStrategie";

export interface Joueur {
  username?: string,
  strategie?: ChoixStrategie,
  coupsPrecedents?: Choix[]
}
