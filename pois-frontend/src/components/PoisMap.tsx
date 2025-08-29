import type { JSX } from "react";
import type { POI } from "../Models/POI";

export type PoisMapProps = {
    pois: POI[]
}

export function PoisMap({ pois }: PoisMapProps): JSX.Element {
    return <>
        {
            pois.map(p => <p>{JSON.stringify(p)}</p>)
        }
    </>
}