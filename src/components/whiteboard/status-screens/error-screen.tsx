import { XCircle } from "phosphor-react";

const ErrorScreen = () => {
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
};

export default ErrorScreen;
