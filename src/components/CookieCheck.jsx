function checkCookieExpiration() {
    let cookieNotExpired = false;
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(cookieName + '='))
        ?.split('=')[1];

    if (cookieValue) {
        const expirationDate = new Date(cookieValue);
        const currentDate = new Date();

        cookieNotExpired =  expirationDate.getTime() > currentDate.getTime();
    }
    else{
        cookieNotExpired = false;
    }
    return {cookieNotExpired}
}

export default checkCookieExpiration;