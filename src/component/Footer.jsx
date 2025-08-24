
   // src/component/Footer.jsx

import styles from "../StyleSheets/Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>

        {/* Left Section - Branding */}
        <div className={styles.left}>
          <img
            src="/src/assets/spring-logo.png"
            alt="Spring Logo"
            className={styles.logo}
          />
          <div>
            <h4 className={styles.brandName}>StudentApp</h4>
            <p className={styles.tagline}>Efficient. Organized. Reliable.</p>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className={styles.center}>
          <a href="#" className={styles.link}>About</a>
          <a href="#" className={styles.link}>Contact</a>
          <a href="#" className={styles.link}>Privacy</a>
          <a href="#" className={styles.link}>GitHub</a>
        </div>

        {/* Right Section - Version Info */}
        <div className={styles.right}>
          <p className={styles.versionText}>
            &copy; {year} Ifham Inc. <br />
            Version <strong>1.0.0</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
