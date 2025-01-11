import { EGender } from "../enums/EGender";
import { EStatus } from "../enums/EStatus";
import { ILocation } from "./ILocation";
import { IOrigin } from "./IOrigin";

export interface ICharacter {
    name: string;
    episode: string[];
    gender: EGender;
    id: number;
    image: string;
    location: ILocation;
    origin: IOrigin;
    species: string;
    status: EStatus;
    type?: string;
    url: string;
    created: string;
}