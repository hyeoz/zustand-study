import { create } from 'zustand';

export type WeatherType = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type WeatherMainType = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

type WeatherStoreType = {
  data: {
    info: WeatherType;
    main: WeatherMainType;
  };
  update: (value: { info: WeatherType; main: WeatherMainType }) => void;
};

export const weatherStore = create<WeatherStoreType>()((set) => ({
  data: {
    info: {
      description: '',
      icon: '',
      id: 0,
      main: '',
    },
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  },
  update: (value) =>
    set((state) => ({
      ...state,
      data: value,
    })),
}));
