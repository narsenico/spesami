const {
    app,
    ipcMain,
    BrowserWindow,
    Menu,
    MenuItem,
    clipboard
} = require('electron'),
    path = require('path'),
    url = require('url'),
    Config = require('./config'),
    Runner = require('./runner');

const stores = [{
    name: 'esselunga',
    engine: require('./esselunga')
}];
// TODO: aggiungere nuovi store

// opzioni di default per una finestra del browser
const optDefault = {
    title: 'spesami',
    webPreferences: {
        webSecurity: false,
        nodeIntegration: true
    }
};
const isMac = process.platform === 'darwin';
// carico le configurazioni
const config = new Config({
    debug: false,
    refresh: 60 * 30 //secondi
});
// definisce le due funzioni log() e error()
//  se in modalità debug rimandano alle rispettive funzioni di console
//  altrimenti non fanno nulla
const {
    log,
    error
} = (() => {
    if (config.get('debug')) {
        return {
            log() {
                console.log(...arguments);
            },

            error() {
                console.error(...arguments);
            }
        }
    } else {
        return {
            log() {},
            error() {
                console.error(...arguments)
            }
        }
    }

})();

// finestra aperta in un dato momento
let currentWin;

(function start() {
    log(config);

    try {
        Runner.on('change-status', resp => {
            log(resp);
            // invio alla pagina la risposta
            currentWin && currentWin.webContents.send('runner-change-status', resp);
        });

        app.on('ready', async () => {
            // // applico il menu all'intera applicazione
            // Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

            const win = new BrowserWindow(optDefault);
            if (config.get('debug')) {
                win.webContents.openDevTools();
            }
            log('loading main page');
            await win.loadFile('app/main.html');
            currentWin = win;

            config.set('lastAccess', new Date());
        });

        // Terminiamo l'App quando tutte le finestre vengono chiuse.
        app.on('window-all-closed', () => {
            // Su macOS è comune che l'applicazione e la barra menù
            // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
            if (!isMac) {
                app.quit()
            }
        });

        ipcMain.on('get-config', (event, key) => {
            event.reply('get-config-reply', config.get(key));
        });

        ipcMain.on('set-config', async (event, value) => {
            try {
                config.set(value);

                if (Runner.isRunning()) {
                    Runner.stop();
                } else {
                    // uso solo gli store abilitati
                    // creo una funzione "run" che incapsula tutti i parametri necessari alla chiamata (normalmente username e pwd)
                    // attenzione che l'intervallo di refresh è passato in secondi
                    Runner.start(stores.filter(store => config.get(`${store.name}_enabled`))
                        .map(store => Object.assign(store, {
                            run: async () => store.engine.run(config.get(`${store.name}_username`), config.get(`${store.name}_password`))
                        })), config.get('refresh') * 1000);
                }

                event.reply('set-config-reply', Runner.isRunning());
            } catch (e) {
                event.reply('set-config-reply', 'error');
                error(e);
            }
        });
    } catch (e) {
        error(e);
    }
})();