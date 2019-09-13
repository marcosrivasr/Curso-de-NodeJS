const ws = new WebSocket('ws://localhost:3000');

ws.onopen = (ev) =>{
    setTitle('Conectado');
};

ws.onclose = (ev) =>{
    setTitle('Desconectado');
};

ws.onmessage = mensaje =>{
    printMessage(mensaje.data);
};

document.querySelector('#formulario').onsubmit = () =>{
    const mensaje = document.querySelector('#mensaje').value;
    ws.send(mensaje);
};

setTitle = (title) =>{
    document.querySelector('h1').innerText = title;
}

printMessage = (message) =>{
    const p = document.createElement('p');
    p.innerText = message;
    document.querySelector('#mensajes').appendChild(p);

}