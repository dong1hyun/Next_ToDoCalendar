import { create } from "zustand";

interface storeType {
    email: string,
    curToDoId: number,
    year: number,
    month: number,
    day: number,
    title: string
    startTime: string,
    duration: string,
    intervalId: number,
    setEmail: (email: string) => void;
    setCurToDo: (id: number, title: string, year: number, month: number, day: number) => void,
    setDuration: (duration: string) => void,
    setIntervalId: (intervalId: number) => void
}

const toDoStore = create<storeType>((set) => ({
    email: "",
    curToDoId: 0,
    year: 0,
    month: 0,
    day: 0,
    title: "없음",
    startTime: "",
    duration: "",
    intervalId: 0,
    setEmail: (email: string) => ({email}),
    setCurToDo: (id: number, title: string, year: number, month: number, day: number) => set(() => ({
        curToDoId: id,
        year,
        month,
        day,
        title,
        startTime: new Date().toString(),
    })),
    setDuration: (duration: string) => set((state) => ({
        ...state, duration
    })),
    setIntervalId: (intervalId: number) => set((state) => ({
        ...state, intervalId
    }))
}));

export default toDoStore;