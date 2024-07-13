"use client"

import { logOut } from "./action";

export default function profile() {
    return <div>
        <form action={logOut}>
            <button>logout</button>
        </form>
        </div>
}