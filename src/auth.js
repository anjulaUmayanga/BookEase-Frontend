import jwtDecode from "jwt-decode";

export function saveToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getUserFromToken() {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token); 
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}

export function logoutUser() {
    localStorage.removeItem("token");
}
