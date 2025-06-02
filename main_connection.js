const log = (text) => {
    const logDiv = document.getElementById('log');
    logDiv.textContent += text + "\n";
    logDiv.scrollTop = logDiv.scrollHeight;
};

let conn;
const peer = new Peer("main_server");


let player_list = [];


peer.on('open', id => {
    document.getElementById('my-id').textContent = id;
    log("🔗 Jouw PeerJS ID is: " + id);
});

peer.on('connection', connection => {
    let conn = connection;

    conn.on('open', () => {
        // now safe to send messages
        // add player AFTER connection opens
        let player_exist = player_list.some(p => p.id === conn.peer);
        if (!player_exist) {
            let new_player = {
                name: "user" + player_list.length.toString(),
                id: conn.peer,
                con: conn
            };
            player_list.push(new_player);
            log("✅ " + new_player.name + " joined the server");
            send_message_all(new_player.name + " joined");
        }
    });

    conn.on('data', data => {
        for (let i = 0; i < player_list.length; i++){
            if (conn.peer === player_list[i].id){
                // when we have the right player
                let name_org = player_list[i].name;
                let local = player_list[i];

                if (data.startsWith("/name")){
                    let new_name = data.slice(6);
                    local.name = new_name
                    // tell the server and the rest that that person chaged there name
                    let text = name_org + ",s name was changed to: " + new_name
                    log(text);
                    send_message_all(text)
                } else{
                    // when normal message
                    log(local.name + ": " + data);
                    send_message_all(local.name + ": " + data)
                }



                player_list[i] = local;
            }
        }
    });

    conn.on('close', () => {
        player_list = player_list.filter(p => p.id !== conn.peer);
        log("❌ Connection with " + conn.peer + " closed.");
        console.log("Players online:", player_list.length);
    });
});



function connect() {
    const otherId = document.getElementById('peer-id').value;
    conn = peer.connect(otherId);

    conn.on('open', () => {
        log("✅ Verbonden met: " + otherId);
    });

    conn.on('data', data => {
        log("📨 Partner zegt: " + data);
    });
}

function sendMessage() {
    const msg = document.getElementById('msg').value;
    // send it to ourselves
    send_message_all("server: " + msg)
    log("server: " + msg)
}

function send_message_all(msg){
    for (let i = 0; i < player_list.length; i++){
        // for every player
        player_list[i].con.send(msg);
    }
}