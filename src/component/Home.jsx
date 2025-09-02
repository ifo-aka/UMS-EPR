
import styles from "../StyleSheets/Home.module.css"
import { Link } from 'react-router-dom';
// import styles from '../StyleSheets/Home.module.css';
import { useSelector,useDispatch } from 'react-redux';
import {
  logout
} from "../store/slices/authSlice";
import Container from "./Container";
const Home = () => {
  const dispatch = useDispatch();
  const role = useSelector((s) => s.auth.role);
  const isAuthenticated = useSelector((a)=>a.auth.isAuthenticated)
  console.log(role)

  

    const handleLogout = () => {
      dispatch(logout());
    };
  // --- Role-based content ---
  const renderRoleBasedHome = () => {
    const roleContent = {
      Guest: {
        title: "Welcome Guest 👤",
        items: [
          "🔍 Explore public resources",
          "📅 View upcoming events",
          "📞 Contact support",
        ],
      },
      STUDENT: {
        title: `Welcome 🎓`,
        items: [
          "📚 View your courses & timetable",
          "📝 Check grades & assignments",
          "📢 University announcements",
        ],
      },
      TEACHER: {
        title: "Welcome Teacher 👨‍🏫",
        items: [
          "📘 Manage your classes",
          "📝 Upload grades & attendance",
          "📢 Post announcements",
        ],
      },
      DEAN: {
        title: "Welcome Dean 🎓🏛️",
        items: [
          "📊 View university-wide reports",
          "👨‍🏫 Manage faculty & courses",
          "✔ Approve results & notices",
        ],
      },
    };
     
    if (roleContent[role.toUpperCase()]) {
      const rolekey = role.toUpperCase();
      return (
        
        <section className={styles.roleSection} >
          <h2 className={styles.title}>{roleContent[rolekey].title}</h2><hr className={styles.hr}/>
          <ul className={styles.cardContainer}>
            {roleContent[rolekey].items.map((item, idx) => (
              <li key={idx} className={styles.card}>{item} </li>
            ))}
          </ul> 
        </section>
      );
    }

    // Default (non-auth)
    return (
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Student Management App</h1>
        <p className={styles.subtitle}>
          Manage your students efficiently and securely.
          {!isAuthenticated && " Please login or sign up to continue."}
        </p>
        {!isAuthenticated && (
          <div className={styles.buttonGroup}>
            <Link to="/login" className={styles.button}>
              Login
            </Link>
            <Link to="/signup" className={styles.button1}>
              Sign Up
            </Link>
          </div>
        )}
      </section>
    );
  };

  return (
  <>
      {renderRoleBasedHome()}

            <section className={styles.announcementSection}>
          <hr className={styles.hr} />
          <h2 className={styles.featuresTitle}>📢 Latest Announcements</h2>
          <ul className={styles.announcementCardContainer}>
            <li className={styles.announcementCard}>🗓️ Midterm exams start from 10th Sept</li>
            <li className={styles.announcementCard}>📚 Library timings updated: 8AM - 8PM</li>
            <li className={styles.announcementCard}>⚡ New feature: Online attendance tracking</li>
          </ul>
        </section>

      <section className={styles.featureCard}>
        <hr/>
        <h2 className={styles.featuresTitle}>General Features</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>📂 View and organize student data</div>
          <div className={styles.card}>🔒 Secure sessions and data protection</div>
          <div className={styles.card}>✨ Easy-to-use interface</div>
          <div className={styles.card}>📱 Responsive design for any device</div>
        </div>
      </section>
       {/* --- Announcements Section --- */}

  
      

          {isAuthenticated && (
        <div className={styles.actions}>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </div>
      )}
    
   </>
  );
};

export default Home;
