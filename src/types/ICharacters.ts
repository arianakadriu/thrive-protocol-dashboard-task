import { ICharacter } from "./ICharacter"
import { IPagination } from "./IPagination";

export interface ICharacters {
    info: IPagination;
    results: ICharacter[];
}