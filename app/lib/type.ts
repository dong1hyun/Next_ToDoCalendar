export interface userType {
    email?: string
    id?: number
}

export interface getCountType {
    email: string
    year: number
    month: number
}

export interface toDosForm {
    id: number
    title: string
    description: string
    type: string
    year: number
    month: number
    day: number
    isComplete: boolean
    duration: number
    created_at: Date
    updated_at: Date
    userEmail: string
}

export interface chartDataType {
    work: number
    friend: number
    individual: number
    education: number
    social: number
}

export interface ToDoRevalidateType {
    email: string 
    year: number 
    month: number 
    day: number
}