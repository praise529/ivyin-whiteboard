import { PlusCircle, Spinner, XCircle } from "phosphor-react";
import "./App.css";
// import Whiteboard from "./components/Whiteboard";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

type StateTypes = "Not Yet." | "Done!" | "Error..." | null;

function Home() {
    const navgitagt = useNavigate();
    const [State, SetState] = useState<StateTypes>("Not Yet.");
    const [DB, SetDB] = useState<IDBDatabase | null>(null);
    const [Whiteboards, SetWhiteboards] = useState<any[]>([]);

    async function DBPersist() {
        if (navigator.storage && navigator.storage.persist) {
            const isPersisted = await navigator.storage.persist();
            console.log(`Persisted storage granted: ${isPersisted}`);
            return isPersisted;
        }
    }

    function CreateWhiteboard() {
        if (!DB) return;

        const ID = crypto.randomUUID();

        const transaction = DB.transaction("illli-whiteboards", "readwrite");

        const store = transaction.objectStore("illli-whiteboards");

        store.add({
            id: ID,
            title: "Untitled Whiteboard",
            createdAt: Date.now(),
        });

        navgitagt(`/whiteboard/${ID}`);
    }

    useEffect(() => {
        const request = window.indexedDB.open("illli-whiteboards", 1);

        request.onerror = (event) => {
            console.error(`BEEP.\n${event}`);
            SetState("Error...");
        };

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("illli-whiteboards")) {
                db.createObjectStore("illli-whiteboards", {
                    keyPath: "id",
                });
            }
        };

        request.onsuccess = async () => {
            SetDB(request.result);
            await DBPersist();
            SetState("Done!");
        };
    }, []);

    if (State === "Error...") {
        return (
            <div
                style={{
                    gap: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <XCircle color="red" weight="bold" size={60}></XCircle>
                <h2 style={{ color: "red" }}>Something went wrong...</h2>
            </div>
        );
    }

    if (State === "Not Yet.") {
        return (
            <div
                style={{
                    gap: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Spinner
                    weight="bold"
                    size={60}
                    className="Spin Dark"
                ></Spinner>
                <h2>Drawing...</h2>
            </div>
        );
    }

    function name() {
        SetWhiteboards([]);
    }

    return (
        <div>
            <div className="Top-Bar">
                <h1>Whiteboards</h1>

                <button className="Primary" onClick={CreateWhiteboard}>
                    <PlusCircle weight="bold" size={22} className="Plus" />
                    <p>Create Whiteboard</p>
                </button>
            </div>
            <div className="All-Whiteboards">
                {Whiteboards.length > 0 ? (
                    <>
                        hi <h1>h1</h1>
                    </>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h1>No Whiteboards... yet</h1>
                        <br></br>
                        <p className="Light">Maybe create a whiteboard?</p>
                        <button onClick={name}>For testing</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
