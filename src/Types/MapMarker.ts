export interface MapMarkerModel {
  id: number;
  x: number;
  y: number;
  name: string;
  img: string;
  map_id: number;
}

export interface mapMarkersPost {
  x: number;
  y: number;
  charName: string;
}
