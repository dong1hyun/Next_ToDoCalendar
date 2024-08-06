import { create } from "zustand";

interface storeType {
    title: string
    startTime: string,
    setCurToDo: (title: string) => void
}

const curToDo_store = create<storeType>((set) => ({
    title: "없음",
    startTime: "",
    setCurToDo: (title: string) => set((state) => ({
        title,
        startTime: new Date().toString()
    }))
}));

export default curToDo_store;