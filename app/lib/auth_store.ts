import { create } from "zustand";

const auth_store = create((set) => ({
    user: {
        email: "",
    }
}))