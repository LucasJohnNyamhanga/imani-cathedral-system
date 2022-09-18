import create from 'zustand'

export const useProgressStore = create((set) => ({
    isAnimating:false,
    setIsAnimating:(isAnimating:boolean) => set(() => ({ isAnimating })),
}))