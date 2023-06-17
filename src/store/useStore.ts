import {create} from 'zustand';

interface IChange {
    isClickPrev: boolean
    isClickNext: boolean
    setIsClickedPrev: () => void;
    setIsClickedNext: () => void;
}

export const useStore = create<IChange>((set) => ({
    isClickPrev: false,
    isClickNext: false,
    setIsClickedPrev: () => set((state) => ({isClickPrev: !state.isClickPrev})),
    setIsClickedNext: () => set((state) => ({isClickNext: !state.isClickNext})),
}));