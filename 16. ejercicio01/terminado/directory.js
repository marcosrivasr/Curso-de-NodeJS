const fs = require('fs');
const path = require('path');

class Directory{

    constructor(){
        this._path = __dirname;
        this.createDocsDir();
    }

    createDocsDir(){
        this._path = path.join(this._path, 'docs', '');
        if(!fs.existsSync('./docs')){
            fs.mkdirSync('./docs');
        }
        
    }

    getPath(){
        return this._path;
    }

    getShortPath(){
        const paths = path.parse(this._path);
        let delimiter = "/";

        if(paths.dir.indexOf(delimiter) < 0){
            delimiter = `\\`;
        }
        //const dirs = paths.dir.split(delimiter);
        return `${paths.root}...${delimiter}${paths.name}`;
    }

    getFilesInDir(){
        const files = fs.readdirSync(this._path);
        let n = 0;
        console.log(`
====================================
Ubicación: ${this.getShortPath()}
====================================`);
        files.forEach(file => {
            if(file != '.DS_Store'){
                console.log(`   ${file}`);
                n++;
            }
        });
    }
}

module.exports = Directory;