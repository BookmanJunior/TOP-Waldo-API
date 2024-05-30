interface MapId {
  map_id: number;
}

export interface Map extends MapId {
  title: string;
  img: string;
}
export type mapGetParams = MapId;
