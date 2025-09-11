import { useEffect, useState } from "react";

const InfoUtility = ({ info }) => {
  const { bgColor = "red", textColor = "white", message, heading } = info;
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    // set initial scroll value
    setScrollTop(document.documentElement.scrollTop);

    const handleScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="info"
      style={{
        background: bgColor,
        color: textColor,
        width: "300px",
        height: "100px",
        position: "absolute",
        top: `${scrollTop + 60}px`, // 👈 keeps it 60px below scroll
        left: "50%",
        transform: "translate(-50%, 0)", // center horizontally only
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    
      }}
    >
      {heading && <h1 style={{ fontSize: "1rem" }}>{heading}</h1>}
      <p>{message}</p>
    </div>
  );
};

export default InfoUtility;
