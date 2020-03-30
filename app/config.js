const electron = require('electron'),
    path = require('path'),
    fs = require('fs');

const argv = require('yargs')
    .alias('D', ['enable-logging', 'debug'])
    .argv;

const parseDataFile = filePath => {
    try {
        const dataParsed = JSON.parse(fs.readFileSync(filePath));
        return dataParsed;
    } catch {
        return {};
    }
};

const assign = (target, ...sources) =>
    Object.assign(target, ...sources.map(x =>
        Object.entries(x)
        .filter(([key, value]) => value !== undefined)
        .reduce((obj, [key, value]) => (obj[key] = value, obj), {})
    ));

class Config {
    constructor(defaults) {
        const userDataPath = (electron.app || electron.remote.app).getPath(
            'userData'
        );
        this.path = path.join(userDataPath, 'spesami.json');
        this.entries = assign({}, defaults, parseDataFile(this.path), {
            debug: !!argv.debug
        });
    }

    get(key) {
        if (key === '*') {
            return Object.assign({}, this.entries);
        } else {
            return this.entries[key];
        }
    }

    getWithPrefix(prefix, removePrefix = false) {
        return Object.keys(this.entries).reduce((m, key) => {
            if (key.startsWith(prefix)) {
                m[removePrefix ? key.substr(prefix.length) : key] = this.entries[key];
            }
            return m;
        }, {});
    }

    set(key, value) {
        if (typeof key === 'object' && value === undefined) {
            Object.assign(this.entries, key);
        } else {
            this.entries[key] = value;
        }
        return fs.writeFileSync(this.path, JSON.stringify(this.entries));
    }
}

module.exports = Config;