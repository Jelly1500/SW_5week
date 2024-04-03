// 중요! 소스코드의 경로에 한글이 있으면 안 됨
// npm init -y
// npm install ws

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        if (message.action && message.action === 'delete') {
            //  delete를 모든 클라이언트에게 보냄
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    console.log('receiced: %s', message);
                    client.send(JSON.stringify({ action: 'delete', messageId: message.messageId }));
                }
            });
        } else {
            // 받은 메시지를 모든 클라이언트에게 보냄
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    console.log('receiced: %s', message);
                    client.send(JSON.stringify({ text: message.text, messageId: message.messageId, username: message.username }));
                }
            });
        }
    });
});
