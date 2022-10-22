const fs = require('fs');
const path = require('path');

class AppFileUtil {
    static getData(resource) {
        // __dirname gets the current directory of the file (file.util.js in this case).
        const file = fs.readFileSync(path.join(__dirname, '../..', `data/${resource}.json`), 'utf8');
        const data = JSON.parse(file);
        return data;
    }

    static writeData(resource, dataObject) {
        const data = JSON.stringify(dataObject);
        fs.writeFileSync(path.join(__dirname, '../..', `data/${resource}.json`), data);
    }
}

module.exports = AppFileUtil;