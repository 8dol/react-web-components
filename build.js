/**
 * Created by frank on 2/29/16.
 */
const fs = require('fs');
const BASE_DIR = './components/';


fs.readdir(BASE_DIR, function (err, files) {
    var contents = "";
    files.forEach(function (fileName) {
        if (fileName == '.DS_Store' || fileName == 'css' || fileName == 'fonts') {
            return;
        }
        var dirName = BASE_DIR.concat(fileName);

        var names = fs.readdirSync(dirName);
        names.forEach(function (name) {
            if (name.indexOf('app.js') < 1) {
                return;
            }

            var fn = dirName.concat("/").concat(name);
            contents = contents.concat(fs.readFileSync(fn)).concat("\r\n");
        });
    });

    fs.writeFile('index.js', contents, function (err) {
        if (err) throw err;
        console.log('build done!');
    });
});