import styles from "../StyleSheets/Container.module.css";
import { useSelector } from "react-redux";

const Container = ({ children }) => {
  const showSpinner = useSelector((s) => s.auth.showSpinner);

  return (
    <>
      {!showSpinner ? (
        <div className={styles.Container}>
          {children}
        </div>
      ) : (
        <div className={styles.container}>
        <div
          className="spinner-border"
          style={{
            width: "4rem",
            height: "4rem",
            position: "absolute",
            top: "50%",
            left: "55%",
          }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        </div>
      )}
    </>
  );
};

export default Container;
