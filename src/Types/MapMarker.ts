interface Coordinates {
  x: number;
  y: number;
}

export interface MapMarkerModel extends Coordinates {
  id: number;
  name: string;
  img: string;
  map_id: number;
}

export interface mapMarkersPost extends Coordinates {
  charName: string;
}
