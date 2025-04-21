import { createContext, useContext } from "react";
import {jwtDecode} from "jwt-decode"


const userAuth = () => {
    const token = localStorage.getItem("auth_token")
    let isLoggedIn = false
    let isShelter = false
    if (token) {

    try {
        const {decodedToken, isExpired} = jwtDecode(token);

        if (!isExpired) {
            isLoggedIn = true
        }
        if (decodedToken.role === "shelter") {
            isShelter = true
        }
    } catch(error) {
        console.log("Error")
    }}
    return {isLoggedIn, isShelter}

}
export default userAuth