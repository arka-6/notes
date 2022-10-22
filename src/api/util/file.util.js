const fs = require('fs');
const path = require('path');

class AppFileUtil {
    static readData(resource) {
        try {
            const file = fs.readFileSync(`tmp/${resource}.json`, 'utf8');
            const data = JSON.parse(file);
            return data;
        } catch (ex) {
            return [];
        }
    }

    static writeData(resource, dataObject) {
        const data = JSON.stringify(dataObject);
        fs.writeFileSync(path.join(process.cwd(), `tmp/${resource}.json`), data);
    }
}

module.exports = AppFileUtil;