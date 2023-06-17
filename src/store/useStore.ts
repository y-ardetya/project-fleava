import {create} from 'zustand';

interface IChange {
    isClicked: boolean;
    setIsClicked: () => void;
}

export const useStore = create<IChange>((set) => ({
    isClicked: false,
    setIsClicked: () => set((state) => ({isClicked: !state.isClicked})),
}));