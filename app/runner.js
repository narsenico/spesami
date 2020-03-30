const EventEmitter = require('events');

let running = false;
let hnd;

const emitter = new EventEmitter();

async function runStores(stores) {
    let res;
    for (let store of stores) {
        try {
            // inizio
            emitter.emit('change-status', {
                source: store.name,
                status: 'calling',
                time: new Date()
            });
            // chiamo
            res = await store.run();
            // fatto
            emitter.emit('change-status', {
                source: store.name,
                status: 'done',
                result: res,
                time: new Date()
            });
        } catch (e) {
            emitter.emit('change-status', {
                source: store.name,
                status: 'error',
                error: e,
                time: new Date()
            });
        }
    }
}

function start(stores = [], interval = 30000) {
    if (running) {
        throw new Error('Already running');
    }

    running = true;
    // avvio una prima volta
    runStores(stores);
    // e poi ad intervallo di tempo fisso
    hnd = setInterval(async () => {
        await runStores(stores);
    }, interval);
}

function stop() {
    clearInterval(hnd);
    hnd = undefined;
    running = false;
}

module.exports = {
    isRunning: () => running,
    start,
    stop,
    on: (event, callback) => emitter.on(event, callback)
}