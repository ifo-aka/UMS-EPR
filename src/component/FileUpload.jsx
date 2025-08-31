import { useState } from "react";
import styles from "../StyleSheets/SignUp.module.css";
import { useDispatch } from "react-redux";
import { setShowSpinner } from "../store/slices/authSlice";
import Container from "./Container";

const MultiFileUpload = () => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState({
    domicile: null,
    matric: null,
    intermediate: null,
  });

  const [messages, setMessages] = useState([]);
  const [dragging, setDragging] = useState(null);

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
                  marginTop: "10px",
                  maxWidth: "120px",
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
      alert("⚠️ Please upload all required documents before submitting.");
      return;
    }

    const fd = new FormData();
    fd.append("domicile", files.domicile);
    fd.append("metric", files.matric);
    fd.append("inter", files.intermediate);

    dispatch(setShowSpinner(true));
    setMessages([]); // reset old msgs

    // ⏳ Show messages progressively WHILE waiting
    addMessage("⏳ Uploading your documents...");
    setTimeout(() => addMessage("📂 Preparing files for parsing..."), 1000);
    setTimeout(() => addMessage("🔍 Parsing files on server..."), 2000);
    setTimeout(() => addMessage("🧠 Analyzing content..."), 3000);

    try {
      const res = await fetch("http://localhost:8080/auth/api/submitdocs", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log(data);

      // When done, add final message
      setMessages("✅ Files submitted successfully!");
      setMessages([])
    } catch (error) {
      console.error(error);
      addMessage("❌ Something went wrong. Please try again.");
    } finally {
      dispatch(setShowSpinner(false));
    }
  };

  return (
    <>
    <Container>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "1rem" }}>
          Upload Required Documents
        </h2>
        {renderUploadBox("Upload Domicile", "domicile", files.domicile)}
        {renderUploadBox("Upload Matric Certificate", "matric", files.matric)}
        {renderUploadBox(
          "Upload Intermediate Certificate",
          "intermediate",
          files.intermediate
        )}
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>

    </Container>
    
      {messages.length > 0 && (
        <div
          className="messagesBox"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            // transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.7)",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            color: "#fff",
            maxWidth: "400px",
          }}
        >
          {messages.map((msg, i) => (
            <p key={i} style={{ margin: "0.4rem 0" }}>
              {msg}
            </p>
          ))}
        </div>
      )}
      </>
  );
};

export default MultiFileUpload;
