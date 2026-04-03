    
import { create } from "zustand";

type LocationStore = {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: "Addis Ababa",
  setSelectedLocation: (value) =>
    set({ selectedLocation: value }),
}));