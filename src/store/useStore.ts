import {create} from 'zustand';

interface IChange {
    dataIndex: number,
    isClickPrev: boolean
    isClickNext: boolean
    setIsClickedPrev: () => void;
    setIsClickedNext: () => void;
    setDataIndex: (index: number) => void;
}

export const useStore = create<IChange>((set) => ({
    dataIndex: 0,
    isClickPrev: false,
    isClickNext: false,
    setIsClickedPrev: () => set((state) => ({isClickPrev: !state.isClickPrev})),
    setIsClickedNext: () => set((state) => ({isClickNext: !state.isClickNext})),
    setDataIndex: (index) => set((state) => ({ dataIndex: index })),
}));