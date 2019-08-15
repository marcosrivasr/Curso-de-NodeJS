const readline = require('readline');
const Messages = require('./messages');
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
        renderInterface(file, `${Messages.fileSaved}\n`);
    }else{
        saveAs(file);
    }
}

function saveAs(file){
    interface.question(Messages.requestFileName, (name) =>{
        if(file.exists(name)){
            console.log(Messages.fileExists);
                interface.question(Messages.replaceFile, (confirm)=>{
                    if(confirm == 'y'){
                        file.saveas(name);
                        renderInterface(file, `${Messages.fileSaved}\n`);
                    }else{
                        renderInterface(file, `${Messages.fileNotSaved}\n`);
                    }
                });
        }else{
            file.saveas(name);
            renderInterface(file, `${Messages.fileSaved}\n`);
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
    interface.question(Messages.requestFileName, (name) =>{
        if(file.exists(name)){
            openFile(file, name);
        }else{
            console.log(Messages.fileNotFound);
            interface.removeAllListeners('line');  
            mainScreen();      
        }
    });
}