const log = (text) => {
    const logDiv = document.getElementById('log');
    logDiv.textContent += text + "\n";
    logDiv.scrollTop = logDiv.scrollHeight;
};

let conn;
const peer = new Peer();

let first_message = false;

peer.on('open', id => {
    document.getElementById('my-id').textContent = id;
    log("🔗 your ID: " + id);
});

peer.on('connection', connection => {
    conn = connection;
    log("✅ connected to: " + conn.peer);
    conn.on('data', data => {
        log("📨 someone: " + data);
    });
});

function connect() {
    const otherId = document.getElementById('peer-id').value;
    conn = peer.connect(otherId);

    let does_connect = false;

    conn.on('open', () => {
        does_connect = true;
        log("✅ connected to: " + otherId);

        conn.on('data', data => {
            log("📨 " + data);
            if (!first_message){
                let new_name = data.split(' ')[0];
                document.getElementById("name").textContent = new_name
            }
            first_message = true;
        });
    });

    log("⏳ connecting to: " + otherId + " pls wait")

    setTimeout(() => {
        if (!does_connect) {
            log("🚫 failed to connect to: " + otherId);
        }
    }, 5000); // 5000ms = 5 seconds
}

function sendMessage() {
    const msg = document.getElementById('msg').value;
    if (conn && conn.open) {
        conn.send(msg);
        document.getElementById('msg').value = '';
        // check if it was a command
        if (msg.startsWith("/name")) {
            let new_name = msg.slice(6);
            document.getElementById("name").textContent = new_name
        }
    } else {
        log("⚠️ not connected");
    }
}