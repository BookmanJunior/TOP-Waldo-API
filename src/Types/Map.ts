import { MapMarkerModel } from './MapMarker.js';

interface MapId {
  map_id: number;
}

export interface Map extends MapId {
  title: string;
  img: string;
}

export interface mapGetRes extends MapId, Map {
  map_data: MapMarkerModel[];
}

export type mapGetParams = MapId;
