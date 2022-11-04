export interface StationInt {
  name: string,
  country: string,
  tags: string,
  favicon: string,
  stationuuid: string,
  url_resolved: string,
  bitrate: number,
  codec: string,
}

export interface StationCardInt extends StationInt {
  type: 'explore' | 'library' | 'category' | 'collection',
  removeToggle?: Function,
  id?: string,
}

export interface ContextInt {
  isPlaying: boolean,
  setPlaying: Function,
  station: StationInt,
  setStation: Function,
  refresh: boolean,
  doRefresh: Function,
  audio: React.RefObject<HTMLAudioElement>,
}

export interface CategoryInt {
  type: 'countries' | 'languages' | 'tags' | 'countries-stations' | 'languages-stations' | 'tags-stations',
}

export interface ExploreInt {
  type: 'most-popular' | 'recently-played',
}

export interface LibraryInt {
  type: 'favorites' | 'collections',
}

export interface CategoryCardInt {
  name: string,
  stationcount: number,
  category?: string,
}

export interface ControlBarInt {
  position: 'bottom' | 'top',
}
