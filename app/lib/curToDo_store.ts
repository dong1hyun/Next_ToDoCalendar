import { create } from "zustand";

interface storeType {
    year: number,
    month: number,
    day: number,
    title: string
    startTime: string,
    setCurToDo: (title: string, year: number, month: number, day: number) => void
}

const curToDo_store = create<storeType>((set) => ({
    year: 2024,
    month: 8,
    day: 15,
    title: "없음",
    startTime: "",
    setCurToDo: (title: string, year: number, month: number, day: number) => set(() => ({
        year,
        month,
        day,
        title,
        startTime: new Date().toString()
    }))
}));

export default curToDo_store;