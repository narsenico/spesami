const request = require('request');

const DEFAULT_OPTIONS = {
    method: 'POST',
    url: 'https://www.esselunga.it/area-utenti/loginExt',
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
    },
    "referrer": "https://www.esselunga.it/area-utenti/applicationCheck?appName=esselungaEcommerce&daru=https%3A%2F%2Fwww.esselungaacasa.it%3A443%2Fecommerce%2Fnav%2Fauth%2Fsupermercato%2Fhome.html%3F&loginType=light",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "username={{username}}&password={{password}}&daru=https%3A%2F%2Fwww.esselungaacasa.it%3A443%2Fecommerce%2Fnav%2Fauth%2Fsupermercato%2Fhome.html%3F&dare=https%3A%2F%2Fwww.esselunga.it%2Farea-utenti%2FapplicationCheck%3FappName%3DesselungaEcommerce%26daru%3Dhttps%253A%252F%252Fwww.esselungaacasa.it%253A443%252Fecommerce%252Fnav%252Fauth%252Fsupermercato%252Fhome.html%253F%26loginType%3Dlight&appName=esselungaEcommerce&promo=&X-CSRF-TOKEN=QDRU-J978-0USB-EH42-VAN7-FPLG-J2M3-UKR1",
    "mode": "cors",
    "followRedirect": false // gestisco il redirect a mano per considerare anche la sessione
}

// risposta primo POST
// Set-Cookie: TS01cd79e3=014bb56e6cef035e063b6a0f43e4f1a458f96bdcceb2e0949646f05acca2f4babc51f363311e579b1877f649c75b532589470d51a485c726e6179a4a44d4731ca5dea563a3cebfb1ede3f46dca6b3706b21b1c18232d1818e566b64013c2396f668276c209733a318b43f666be1e143140991dab419d5e972bbcf3d2c78c3957d7d7ceb4768a84bf7c30abfb860a8fca1b481737b7; Path=/; Domain=.esselunga.it

// richiesta primo redirect
// GET /area-utenti/applicationCheck?appName=esselungaEcommerce&daru=https%3A%2F%2Fwww.esselungaacasa.it%3A443%2Fecommerce%2Fnav%2Fauth%2Fsupermercato%2Fhome.html%3F HTTP/1.1
// Host: www.esselunga.it
// Connection: keep-alive
// Cache-Control: max-age=0
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
// Sec-Fetch-Dest: document
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: navigate
// Sec-Fetch-User: ?1
// Referer: https://www.esselunga.it/area-utenti/applicationCheck?appName=esselungaEcommerce&daru=https%3A%2F%2Fwww.esselungaacasa.it%3A443%2Fecommerce%2Fnav%2Fauth%2Fsupermercato%2Fhome.html%3F&loginType=light
// Accept-Encoding: gzip, deflate, br
// Accept-Language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7
// Cookie: BIGipServerPOOL-istituzionale-www.esselunga.it-area-utenti-8001=!1Sjw3C00BBvpFSF41mo5hbGOYn/a+0qHveQLxq0qNQJwaizY6tzZlU31EdMubzbNvmFxvchdd9k8Xw==; BIGipServerPOOL-www.esselunga.it-AEM-HTTP=!mEac23HfsK5eBf141mo5hbGOYn/a+10VlCXm7cD5IOiFMotkcdYgsXjSLtl0d+VR1WIOziX4mHQkimA=; _ga=GA1.2.1769517672.1583827720; renderid=rend01; BIGipServerPOOL-istituzionale-www.esselunga.it-STATICS-HTTP=!jhyN2C6QcB7vW6iFlUR0wbe4lx+85lBDPi5ColDGxASf37PPdPsVcaZtDLHxFmIH8hNAwrfJ11kskYw=; cc_advertising=yes; _fbp=fb.1.1583827745765.2083427769; TS01cd79e3_30=01e7b808c67f470c885c4a6dd04871ac6da52d7a05e77f0ffa79a610610f4214a27aab861ae2ce7e2c53e7e99cc945b9d5cf254b5b; _gcl_au=1.1.1393341122.1583827964; JSESSIONID=16ao9gdrkxcrncipxenf6pe02; TS01cd79e3_26=01e7b808c66dfa7b15f602317b9d80070f01095547e77f0ffa79a610610f4214a27aab861aa6d7842f70f019d49355c7212c23371c2ccdec14852428a5f8befadb2cb019e4; TS01cd79e3_77=088f054a13ab280013c0cf955944cb98555cd019a8ab248d7a059ab07bda036527347928650de39244eb711d1e8c83880871a4cd64823800a73a650c8b5ea21cc3dd7ef1ca53319faf5bec7221b238e96a3f65c86506135cefeb703d891089428d62323065b82745eeffa9a138c30104; _gid=GA1.2.37438436.1585471302; ESSELUNGA_GCWI_JSESSIONID=kgYDpQvSknZXZPC0q3FPrplnJMSphgGsCnZDFY9v1FylnG0XPblP!-134586986; TS01cd79e3=014bb56e6cef035e063b6a0f43e4f1a458f96bdcceb2e0949646f05acca2f4babc51f363311e579b1877f649c75b532589470d51a485c726e6179a4a44d4731ca5dea563a3cebfb1ede3f46dca6b3706b21b1c18232d1818e566b64013c2396f668276c209733a318b43f666be1e143140991dab419d5e972bbcf3d2c78c3957d7d7ceb4768a84bf7c30abfb860a8fca1b481737b7; _gat_UA-79392629-7=1

const STATUS_OPTIONS = {
    method: 'GET',
    url: 'https://www.esselungaacasa.it/ecommerce/resources/auth/slot/status',
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
    },
    "referrerPolicy": "no-referrer-when-downgrade",
    "mode": "cors",
    "followRedirect": false // gestisco il redirect a mano per considerare anche la sessione
}

// richiesta status
// GET /ecommerce/resources/auth/slot/status HTTP/1.1
// Host: www.esselungaacasa.it
// Connection: keep-alive
// Accept: application/json, text/plain, */*
// Sec-Fetch-Dest: empty
// X-XSRF-TOKEN: 5D24B09DAD15957D9E496A3727D5D8E8AF57927169D4C25A8EB01952A20A8E42
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Referer: https://www.esselungaacasa.it/ecommerce/nav/auth/supermercato/home.html?esseiaOtp=36724aa516b339b926d311b699e14fe2e483b5ad
// Accept-Encoding: gzip, deflate, br
// Accept-Language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7
// Cookie: TS01c25ddf=014bb56e6c4097d64c74b8ce0a816042622ea2ce5c43fd54fde06462b35fb7f75af905056325c1b711d2aae728ad3590a597aaf86bce6454112a42c2a34f488061bfabe2df68695e8d5e98a5d4a19d1772e7781aaec8f2b81fa20fc5ab44534c650d5d15cdd843997ea83c4aec97f5084cfda9f22d; JSESSIONID=6KsfpQyXGtPrz3nNVgJGvSwSkDqL09tpXcQRLvsQbJ28Gz2jp8W2!-770032409; TS0196386f=014bb56e6c5476a1d62a6e76afac4f0abc90b1b7504dbae06c39d3808317460345683ca1e400eb8a212805d1faa404fd5c191c0d0a1d1a96f475e064ab0bac04eb36473744; _ga=GA1.3.1130817855.1583686802; addressVerified=0; cc_advertising=yes; _gid=GA1.3.1929198459.1585471311; _ga=GA1.2.1130817855.1583686802; _gid=GA1.2.1929198459.1585471311; BIGipServerPOOL-produzione20.esselungaacasa.it-HTTP=!QkzBAdpCcTZCPJrIGaqRY80fpDA+1s+TFdVZMlCj2XrVe64yB9+01k89QWBca95LNe+FCHGZpzioNos=; XSRF-ECOM-TOKEN=5D24B09DAD15957D9E496A3727D5D8E8AF57927169D4C25A8EB01952A20A8E42; TS01d2e5b4_77=088f054a13ab280023ee1545baed4e1bdf181f8bdddc2954da2513df1aef3f8a2afce63911a6c0e1402fa4223d1e2727087904a048823800b2ece79234c789b7ce56ba0a6e0aa59dc50d2060cac2cd9970ff05192f7120e3cc174422c0ff771bcfd9ae886295e7a0818f85bf14c16804; BIGipServerPOOL-ecom30.webapp.esselungaacasa.it-AEM-HTTP=!Thlg10NdrDRCWYPIGaqRY80fpDA+1lol9x42uo99FdcAwI7inouVYcwMyuZW/KDMlVMYZcKGl8AUo3Y=; BIGipServerPOOL-ecom30.webapp.esselungaacasa.it-8001=!6uNeko2YgocnqFrIGaqRY80fpDA+1kJokpzCo7NUzPIfU0QbcsCD490wJof2hTXkClNMNkDat7JcOw==; TS01d2e5b4=014bb56e6c9345790b3dd92440f7a98e6a97e9ba25870fb7113f2b1efd7038095f0444cc3068d156834d6f71ecce023350fb30f4273fa6d70e5cd822b9164004d17407fcc91c5100746a6cabcd52edee2a3cd4c80da77ba5acd5c3ab45494dffbf372196b24961eca86d0c287e15c02b63cb69f549; _gat_UA-79392629-1=1

/**
 *
 * @param {object} options opzioni di connessione
 * @param {string} username nome utente
 * @param {string} password password
 * @returns cookie
 */
async function login(options, username, password) {
    if (options.body) {
        // sostituisco username e password nel corpo della richiesta
        options.body = options.body
            .replace('{{username}}', encodeURIComponent(username))
            .replace('{{password}}', encodeURIComponent(password));
    }

    return new Promise((resolve, reject) => {

        request(options, async (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                console.log('[esselunga] login done');
                // console.log(res.headers);
                resolve(res.headers['set-cookie'].join('; '));
            } else if (res.statusCode === 302) {
                if (res.headers.location && res.headers.location !== options.url) {
                    console.log('[esselunga] redirect: ' + res.headers.location);
                    try {
                        options.url = res.headers.location;
                        options.method = 'GET';
                        options.body = null;
                        options.headers.cookie = res.headers['set-cookie'].join('; ');
                        resolve(await login(options));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(`HTTP ${res.statusCode} ${res.statusMessage}`);
                }
            } else {
                reject(`HTTP ${res.statusCode} ${res.statusMessage}`);
            }
        });
    });
}

/**
 *
 * @param {object} options opzioni di connessione
 * @param {string} cookie cookie
 * @returns
 */
async function status(options, cookie) {
    return new Promise((resolve, reject) => {

        const [, xsrf] = /XSRF-ECOM-TOKEN=([^;]+);/i.exec(cookie) || [];
        options.headers['X-XSRF-TOKEN'] = xsrf;
        options.headers.cookie = cookie;

        request(options, async (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                console.log('[esselunga] status read');
                //console.log(body);
                //resolve(body);
                const status = JSON.parse(body);
                if (status && status.slots && status.slots.length > 0) {
                    // ultimo slot (data maggiore)
                    const last = status.slots.reduce((m, slot) => {
                        return m < slot.endTime ? slot.endTime : m;
                    }, '');
                    // slot disponibile (ci sono anche altri stati ma dipendono dai prodotti nel carrello)
                    const slot = status.slots.find(slot => slot.viewStatus == 'DISPONIBILE' || slot.viewStatus == 'QUASI_ESAURITA');
                    if (slot) {
                        resolve({
                            available: true,
                            date: slot.startTime,
                            last,
                            slot
                        });
                    } else {
                        resolve({
                            available: false,
                            last
                        });
                    }
                } else {
                    resolve({
                        available: false,
                        error: 'no_slots'
                    });
                }
            } else {
                reject(`HTTP ${res.statusCode} ${res.statusMessage}`);
            }
        });
    });
}

async function run(username, password) {
    const cookie = await login(Object.assign({}, DEFAULT_OPTIONS), username, password);
    const res = await status(Object.assign({}, STATUS_OPTIONS), cookie);
    console.log('[esselunga]', res);
    return res;
}

module.exports = {
    run
}