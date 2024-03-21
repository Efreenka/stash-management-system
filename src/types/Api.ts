export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface User {
    created: string
    email: string
    id: number
    name: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface AddStashFormDataRequest {
    name: string
}
