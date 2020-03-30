const {
    net
} = require('electron');
const moment = require('moment');

async function home() {
    return new Promise((resolve, reject) => {

        const request = net.request({
            url: 'https://www.bennetdrive.it/CommerceCore/',
            method: 'GET'
        });
        request.on('response', response => {
            if (response.statusCode === 200) {
                resolve(response.headers['set-cookie'].join('; '));
            } else {
                reject(`HTTP ${response.statusCode} ${response.statusMessage}`);
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}

async function securityCheck(username, password, cookie) {
    return new Promise((resolve, reject) => {

        const request = net.request({
            url: 'https://www.bennetdrive.it/CommerceCore/j_spring_security_check',
            method: 'POST'
        });
        request.setHeader('Cookie', cookie);
        request.on('response', response => {
            if (response.statusCode === 200) {
                resolve();
            } else {
                reject(`HTTP ${response.statusCode} ${response.statusMessage}`);
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.write(`j_username=${encodeURIComponent(username)}&j_password=${encodeURIComponent(password)}`);
        request.end();
    });
}

async function readVsId(name, cookie) {
    return new Promise((resolve, reject) => {

        const request = net.request({
            url: 'https://www.bennetdrive.it/CommerceCore/app/guest/shop/list',
            method: 'GET'
        });
        request.setHeader('Cookie', cookie);
        request.setHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        request.on('response', response => {
            if (response.statusCode === 200) {
                let body = '';
                response.on('data', chunk => {
                    body += chunk;
                })
                response.on('end', () => {
                    const data = JSON.parse(body).data;
                    const vs = data.find(r => r.vsNome == name);
                    resolve(vs ? vs.vsId : null);
                })
            } else {
                reject(`HTTP ${response.statusCode} ${response.statusMessage}`);
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}

async function list(vsId, cookie) {
    return new Promise((resolve, reject) => {

        const request = net.request({
            url: `https://www.bennetdrive.it/CommerceCore/app/band/list?vsId=${vsId}&ordine=`,
            method: 'GET'
        });
        request.setHeader('Cookie', cookie);
        request.on('response', response => {
            if (response.statusCode === 200) {
                let body = '';
                response.on('data', chunk => {
                    body += chunk;
                })
                response.on('end', () => {
                    const data = JSON.parse(body).data;
                    // fasceCC => ritiro drive
                    // fasceHD => consegna a casa
                    let fascia;
                    for (let day of data) {
                        fascia = day.fasceCC.find(f => f.flag === 1);
                        if (fascia) {
                            const [, hh, mm] = /(\d{2}):(\d{2})/.exec(fascia.fascia);
                            resolve({
                                available: true,
                                date: moment(day.date).hours(hh).minutes(mm).toDate()
                            });
                            return;
                        }
                    }
                    resolve({
                        available: false
                    });
                })
            } else {
                reject(`HTTP ${response.statusCode} ${response.statusMessage}`);
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}

async function run({
    username,
    password,
    city
}) {
    console.log(username, password, city)
    const cookie = await home();
    await securityCheck(username, password, cookie);
    const vsId = await readVsId(city, cookie);
    const res = await list(vsId, cookie);
    console.log('[bennetdrive]', res);
    return res;
}

module.exports = {
    run
}