export interface mapId {
  map_id: number;
}

export interface Leaderboard extends mapId {
  id: number;
  name: string;
  time: number;
  created_at: number;
}

export interface leaderboardPostBody extends mapId {
  name: string;
}
