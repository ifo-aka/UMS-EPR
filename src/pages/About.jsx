import styles from "../StyleSheets/About.module.css";
const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.title}>About Us</h1>
            <p className={styles.description}>We are a team of dedicated professionals committed to providing the best service possible.</p>
        </div>
    );
}

export default About;
   