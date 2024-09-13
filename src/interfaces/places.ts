export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:         string;
    type:       string;
    place_type: string[];
    relevance:  number;
    properties: Properties;
    text:       string;
    place_name: string;
    center:     number[];
    geometry:   Geometry;
    context:    Context[];
}

export interface Context {
    id:          string;
    mapbox_id:   string;
    text:        string;
    wikidata?:   Wikidata;
    short_code?: ShortCode;
}

export enum ShortCode {
    Us = "us",
    UsCA = "US-CA",
}

export enum Wikidata {
    Q30 = "Q30",
    Q599301 = "Q599301",
    Q62 = "Q62",
    Q99 = "Q99",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    foursquare: string;
    landmark:   boolean;
    address:    string;
    category:   string;
    maki:       string;
}
