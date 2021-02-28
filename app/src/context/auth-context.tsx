import {createContext} from "react";

interface context {
    token: null | string
    login: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<context>({
    token: null,
    login: (token: string) => {},
    logout:() => {}
})