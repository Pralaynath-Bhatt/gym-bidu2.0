import React, { useEffect } from "react";
import error from "./image/error.gif";

const fadeInKeyframes = `
@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

const NoPage = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fadeInKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fefefe",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        animation: "bounceIn 1s ease",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#e63946", marginBottom: "1rem" }}>
        NO Page Thanks 😵
      </h1>
      <img
        src={error}
        alt="rick roll baby!!!!!"
        style={{
          width: "400px",
          maxWidth: "90%",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          animation: "bounceIn 1s ease",
        }}
      />
    </div>
  );
};

export default NoPage;
