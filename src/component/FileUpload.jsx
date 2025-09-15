import { useState, useEffect, useRef } from "react";
import styles from "../StyleSheets/SignUp.module.css";
import { useDispatch } from "react-redux";
import { setShowSpinner } from "../store/slices/authSlice";
import Container from "./Container";
import InfoUtility from "../store/InfoUtility";

const MultiFileUpload = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);

  const [files, setFiles] = useState({
    domicile: null,
    matric: null,
    intermediate: null,
  });

  const [messages, setMessages] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [parsedData, setParsedData] = useState(null); // final DocsDTA JSON

  const handleFileSelect = (file, type) => {
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragging(null);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, type);
  };

  const handleDragEnter = (e, type) => {
    e.preventDefault();
    setDragging(type);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderUploadBox = (label, type, file) => (
    <div
      className={`${styles.uploadBox} ${
        dragging === type ? styles.dragActive : ""
      }`}
      onDrop={(e) => handleDrop(e, type)}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, type)}
      onDragLeave={handleDragLeave}
      style={{ position: "relative" }}
    >
      <p className={styles.uploadLabel}>{label}</p>

      <input
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={(e) => handleFileSelect(e.target.files[0], type)}
      />

      <p className={styles.uploadText}>
        {file ? (
          <>
            <span className={styles.successFile}>✅ {file.name}</span>
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{
                  marginTop: "5px",
                  maxWidth: "60px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                }}
              />
            )}
          </>
        ) : (
          "Drag & drop or click anywhere on the box to select an image"
        )}
      </p>
    </div>
  );

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.domicile || !files.matric || !files.intermediate) {
      setInfoMessage({
        bgColor: "red",
        textColor: "white",
        message: "⚠️ Please upload all documents",
      });
      setTimeout(() => setInfoMessage(null), 2000);
      return;
    }

    const fd = new FormData();
    fd.append("domicile", files.domicile);
    fd.append("metric", files.matric);
    fd.append("inter", files.intermediate);

    dispatch(setShowSpinner(true));
    setMessages([]);
    setParsedData(null);

    try {
      // SSE via fetch
      const response = await fetch("http://localhost:8080/auth/api/submitdocs", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) throw new Error("Upload failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        chunk.split("\n\n").forEach((line) => {
          if (line.startsWith("event:")) {
            const [_, eventName] = line.split(":");
            // next line will be data
          }
          if (line.startsWith("data:")) {
            const dataStr = line.replace("data:", "").trim();

            if (line.includes("DocsDTA") || dataStr.startsWith("{")) {
              try {
                const json = JSON.parse(dataStr);
                setParsedData(json); // Autofill forms here!
              } catch (e) {
                console.error("Invalid JSON:", e);
              }
            } else if (dataStr === "DONE") {
              addMessage("🎉 Completed!");
            } else {
              addMessage(dataStr);
            }
          }
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setInfoMessage({
        bgColor: "red",
        textColor: "white",
        message: "❌ Upload failed. Please check your connection.",
      });
      setTimeout(() => setInfoMessage(null), 2000);
    } finally {
      dispatch(setShowSpinner(false));
    }
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      Object.values(files).forEach((file) => {
        if (file) URL.revokeObjectURL(file);
      });
    };
  }, [files]);

  return (
    <>
      <Container>
        <div className={styles.fileuploadcontainer}>
          <form className={styles.fileUploadForm} onSubmit={handleSubmit}>
            <h2>Upload Required Documents</h2>
            <div className={styles.uploadBoxContainer}>
              {renderUploadBox("Upload Domicile", "domicile", files.domicile)}
              {renderUploadBox("Upload Matric Certificate", "matric", files.matric)}
              {renderUploadBox(
                "Upload Intermediate Certificate",
                "intermediate",
                files.intermediate
              )}
            </div>
            <div>
              {files.domicile && files.intermediate && files.matric && (
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              )}
            </div>
          </form>

          <p>
            Please make sure your documents are clear, valid, and match the
            required format. Uploads should not exceed 5MB each. Accepted formats
            are JPEG and PNG only. Once submitted, you will see live progress
            updates from the server as your files are uploaded and analyzed.
          </p>
        </div>
      </Container>

      {messages.length > 0 && (
        <div
          className="messagesBox"
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            background: "rgba(0,0,0,0.7)",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            color: "#fff",
            maxWidth: "400px",
            transform: "translateX(-50%)",
          }}
        >
          {messages.map((msg, i) => (
            <p key={i} style={{ margin: "0.4rem 0" }}>
              {msg}
            </p>
          ))}
        </div>
      )}

      {parsedData && (
        <pre style={{ background: "#222", color: "#0f0", padding: "1rem" }}>
          {JSON.stringify(parsedData, null, 2)}
        </pre>
      )}

      {infoMessage && <InfoUtility info={infoMessage} />}
    </>
  );
};

export default MultiFileUpload;
