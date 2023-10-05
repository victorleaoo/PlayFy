// Check for a Token on the LocalStorage(if there isn't, gets it from the URL)
// Also checks the expiration time
export function getTokenFromURL() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let tokenExpiration = window.localStorage.getItem("tokenExpiration");

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

        // Obtenha o tempo de expiração em segundos (suponhamos que o serviço forneça esse valor)
        const expiresIn = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

        // Calcule a data de expiração em milissegundos a partir do tempo de expiração
        const expirationTime = Date.now() + (parseInt(expiresIn) * 1000);

        window.location.hash = "";
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("tokenExpiration", expirationTime);
    }

    // Verifique se o token está expirado e remova-o do localStorage, se necessário
    if (token && tokenExpiration) {
        const currentTime = Date.now();
        if (currentTime >= parseInt(tokenExpiration)) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenExpiration");
            token = ""; // Token expirado, defina como null ou trate de acordo com sua lógica
        }
    }

    return token;
}