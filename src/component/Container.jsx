import styles from "../StyleSheets/Container.module.css";
import { useSelector } from "react-redux";

const Container = ({ children }) => {
  const showSpinner = useSelector((s) => s.auth.showSpinner);
console.log(showSpinner)
  return (
    <>
      {!showSpinner ? (
        <div className={styles.container}>{children}</div>
      ) : (
        <div className={styles.container}>
          <div
            className={`spinner-border ${styles.spinner}`}
            style={{
              width: "4rem",
              height: "4rem",
              position: "absolute",
              top: "50%",
              
             
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
