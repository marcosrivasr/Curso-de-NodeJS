const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 3000});

wss.on('connection', (ws, request) =>{
    
    ws.on('message', message =>{
        console.log(ws.id);
        if(message === 'exit'){
            ws.close();
        }else{
            wss.clients.forEach(client =>{
                client.send(message);
            });
        }
    });
    ws.send('Bienvenido al chat...');
});

