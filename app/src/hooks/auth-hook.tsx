import { useCallback, useState, useEffect } from "react";
import {useHistory} from "react-router-dom"

let logoutTimer: ReturnType<typeof setTimeout>;

export const useAuth = () => {
    const [token, setToken] = useState<null | string>(null);
    const [tokenExperationDate, setTokenExperationDate] = useState<null | Date>(null);
    const history = useHistory()

    const login = useCallback(
        (tokn: string, experationDate?: null | Date) => {
            setToken(tokn);
            const toknExperationDate = experationDate || new Date(new Date().getTime() + 6000 * 60 * 60)
            localStorage.setItem("token", JSON.stringify({token: tokn, experation: toknExperationDate.toISOString()}));
            setTokenExperationDate(toknExperationDate);
        }, 
        []
    )

    const logout = useCallback(
        () => {
            setToken(null);
            setTokenExperationDate(null);
            localStorage.removeItem("token");
            history.push("/");
        }, 
        [history]
    )

    useEffect(() => {
        const storedData =  JSON.parse(localStorage.getItem("token") as string);
        if(storedData && storedData.token && new Date(storedData.experation) > new Date()){
          login(storedData.token, new Date(storedData.experation))
        }
       },[login, history]);

    useEffect(() => {
        if(token && tokenExperationDate){
         const remainingTime = tokenExperationDate.getTime() - new Date().getTime(); 
         logoutTimer = setTimeout(logout, remainingTime)
        } else {
          clearTimeout(logoutTimer);
        }
   
      }, [token, logout, tokenExperationDate]);


    return {token, login, logout}
}