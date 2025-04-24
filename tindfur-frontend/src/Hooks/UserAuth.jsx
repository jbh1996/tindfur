import { createContext, useContext } from "react";
import {jwtDecode} from "jwt-decode"
import { isExpired } from "react-jwt";


const userAuth = () => {
    const token = localStorage.getItem("auth_token")
    const isLoggedInCheck = (token) =>  {
        if (!token) {
            return false;
        } try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp >= currentTime
            } catch (error) {
                return false
            }
        }
    const isShelterInCheck = (token) =>  {
            if (!token) {
                return false;
            } try {
            const decodedToken = jwtDecode(token);


            return decodedToken.role === "shelter"
                } catch (error) {
                    return false
                }
            }

    const isShelter = isShelterInCheck(token)
    const isLoggedIn = isLoggedInCheck(token)

    return {isLoggedIn, isShelter}

}
export default userAuth