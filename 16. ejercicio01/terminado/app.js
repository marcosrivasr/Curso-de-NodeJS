const readline = require('readline');
const Document = require('./document');
const Directory = require('./directory');
const dir = new Directory();
let interface = readline.createInterface(process.stdin, process.stdout);


const tools =`Comandos: :q = salir, :sa = guardar como, :s = guardar
--------------------------------------`
const pantalla = `
                    ================
                    Editor de texto.\n
                    ================
                    Elige una opcion:\n
                    1 Crear nuevo documento
                    2 Abrir documento
                    3 Cerrar editor\n> `;

mainScreen();
function mainScreen(){
    process.stdout.write('\033c');
    interface.question(pantalla, (res) =>{
        switch(res.trim()){
            case '1':
            createFile();
            break;
    
            case '2':
            openFileInterface();
            break;
    
            case '3':
            interface.close();
            break;
    
            default:
            //console.log(`Debes ingresar una opción válida. Vuelve a iniciar el programa`);
            //interface.close();
            //interface.removeAllListeners('line');
            mainScreen();
        } 
    });
}

function readCommands(file){
    interface.on('line', (input)=>{
        switch(input.trim()){
            case ':sa':
                saveAs(file);
            break;
            
            case ':q':
                interface.removeAllListeners('line');
                mainScreen();
            break;

            case ':s':
                save(file);
            break;

            default:
                file.append(input.trim());
        }
    })
}

function createFile(){
    let file = new Document(dir.getPath());
    
    renderInterface(file);
    readCommands(file);
}

function save(file){
    if(file.hasName()){
        file.save()
        renderInterface(file, `Archivo guardado, puedes seguir editando...\n`);
    }else{
        saveAs(file);
    }
}

function saveAs(file){
    interface.question('* Nombre del archivo: ', (name) =>{
        if(file.exists(name)){
            console.log(`*** El archivo ${name} ya existe! ***`);
                interface.question('Deseas sustituir el archivo?(y/n): ', (confirm)=>{
                    if(confirm == 'y'){
                        file.saveas(name);
                        renderInterface(file, `Archivo guardado con éxito, puedes seguir editando...\n`);
                    }else{
                        renderInterface(file, `Archivo no guardado, puedes seguir editando...\n`);
                    }
                });
        }else{
            file.saveas(name);
            renderInterface(file, `Archivo guardado con éxito, puedes seguir editando...\n`);
        }
    });
}

function openFile(file, name){
    content = file.open(name);
    renderInterface(file);
    readCommands(file);
}

function renderInterface(file, mensaje){
    process.stdout.write('\033c');
    (file.getName() == '') ? console.log(`| Untitled |`) : console.log(`| ${file.getName()} |`);
    console.log(tools);
    if(mensaje != null) console.log(mensaje);
    console.log(file.getContent());
}

function openFileInterface(){
    let file = new Document(dir.getPath());
    dir.getFilesInDir();
    interface.question('* Nombre del archivo para abrir: ', (name) =>{
        if(file.exists(name)){
            openFile(file, name);
        }else{
            console.log('El archivo no existe');
            interface.removeAllListeners('line');  
            mainScreen();      
        }
    });
}