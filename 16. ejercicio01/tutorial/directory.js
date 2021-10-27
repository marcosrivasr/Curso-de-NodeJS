const fs = require('fs');
const path = require('path');

class Directory{

    constructor(){
        this._dir = 'docs';
        this._path = __dirname;
        this.createDocsDir();
    }

    createDocsDir(){
        this._path = path.join(this._path, this._dir);

        if(!fs.existsSync(this._dir)){
            fs.mkdirSync(this._dir);
        }
    }

    getPath(){
        return this._path;
    }

    getShortPath(){
        const paths = path.parse(this._path); // path.parse lo que hace es desintegrar (separar por bytes) this._path (__dirname)
        let delimiter = '/'; // Primero designamos el separador de directorios con /

        // Pero según el sistema operativo tengo que ver que si me devuelve / ó \ en windows
        if(paths.dir.indexOf(delimiter) < 0){ // buscamos con indexOf si se encuentra el delimitador /
            // No ha encontrado el delimitador /, por lo que el SO es windows
            delimiter = `\\`; // Pongo dos barras invertidas porque si dejo una sóla es como si le dijeramos que va a ser un comando especial
        }

        return `${paths.root}...${delimiter}${paths.name}`; // Devolvemos una manera más corta del path donde nos encontramos
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