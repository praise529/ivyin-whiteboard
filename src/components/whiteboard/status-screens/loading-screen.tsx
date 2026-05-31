import { Spinner } from "phosphor-react";

const LoadingScreen = () => {
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
            <Spinner weight="bold" size={60} className="Spin Dark"></Spinner>
            <h2>Drawing...</h2>
        </div>
    );
};

export default LoadingScreen;
