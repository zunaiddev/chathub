import {Client} from "@stomp/stompjs";
import toast from "react-hot-toast";
import {useState} from "react";

function TestPage() {
    const [token, setToken] = useState("");

    const client = new Client({
        brokerURL: "ws://localhost:8080/api/ws",

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        debug: (message) => console.log(message),

        onConnect: () => {
            console.log("STOMP connected successfully");
        },

        onStompError: (frame) => {
            console.error("STOMP error:", frame.body);
        }
    });

    console.log("Connected", client.connected);

    function connect() {
        client.activate();
        toast.success("Connected successfully");
    }

    async function disconnect() {
        await client.deactivate();
        toast.success("Disconnected successfully");
    }

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-5">
            <button disabled={client.connected} onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
            <input value={token} onChange={e => setToken(e.target.value)}/>
        </div>
    );
}

export default TestPage;