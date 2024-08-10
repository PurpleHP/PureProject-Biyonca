function checkCookieExpiration() {
    let cookieNotExpired = false;
    const cookieValue = localStorage.getItem("tokenExpiration");
    console.log(cookieValue);
    if (cookieValue) {
        const expirationDate = new Date(cookieValue);
        const currentDate = new Date();

        cookieNotExpired =  expirationDate.getTime() > currentDate.getTime();
    }
    else{
        cookieNotExpired = false;
    }
    console.log(cookieNotExpired)
    return {cookieNotExpired}
}

export default checkCookieExpiration;