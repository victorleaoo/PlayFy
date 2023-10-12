export function getTokenFromURL() {
    /*
    Check for a Token on the LocalStorage(if there isn't, gets it from the URL)
    Also checks the expiration time
    */
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let tokenExpiration = window.localStorage.getItem("tokenExpiration");

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

        // Expiration time in seconds
        const expiresIn = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

        // Expiration time in milliseconds
        const expirationTime = Date.now() + (parseInt(expiresIn) * 1000);

        window.location.hash = "";
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("tokenExpiration", expirationTime);
    }

    // Verify if the token is expired and removes it from the localStorage
    if (token && tokenExpiration) {
        const currentTime = Date.now();
        if (currentTime >= parseInt(tokenExpiration)) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenExpiration");
            token = ""; // Expired token
        }
    }

    return token;
}