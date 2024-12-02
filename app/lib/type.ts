export interface userType {
    email?: string,
    id?: number
}

export interface getCountType {
    user: userType
    year: number, 
    month: number
}