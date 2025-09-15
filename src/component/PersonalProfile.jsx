import React from "react";
import { motion } from "framer-motion";
import styles from "../StyleSheets/PersonalProfile.module.css";

import { useSelector } from "react-redux";
import { em } from "framer-motion/client";

// Role-based PersonalProfilePage.jsx
// Displays different info depending on user role (student, admin, dean, owner)

export default function PersonalProfilePage() {
    const user = useSelector((s)=>s.auth.userObject);
    console.log(user);
    
  const { role, username, email,id } = user;
  console.log(role)

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={styles.card}
      >
        <div className={styles.layout}>
          {/* Left column: avatar + basic info */}
          <div className={styles.leftCol}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>{username.charAt(0)}</div>
            </div>

            <h2 className={styles.name}>{name}</h2>
            <p className={styles.subtitle}>{role.toUpperCase()}</p>

            {role === "student" && (
              <div className={styles.statsGrid}>
                <Stat label="Enrolled Courses" value="6" />
                <Stat label="CGPA" value="3.7" />
                <Stat label="Credits" value="72" />
              </div>
            )}

            {role === "admin" && (
              <div className={styles.statsGrid}>
                <Stat label="Total Students" value="1200" />
                <Stat label="Staff" value="85" />
                <Stat label="Departments" value="12" />
              </div>
            )}

            {role === "DEAN" && (
              <div className={styles.statsGrid}>
                <Stat label="Faculty" value="5" />
                <Stat label="Programs" value="24" />
                <Stat label="Research Grants" value="3" />
              </div>
            )}

            {role === "owner" && (
              <div className={styles.statsGrid}>
                <Stat label="Campuses" value="3" />
                <Stat label="Revenue" value="$2.5M" />
                <Stat label="Staff" value="350" />
              </div>
            )}

            <button className={styles.outlineBtn}>Message</button>
          </div>

          {/* Right column: dynamic content */}
          <div className={styles.rightCol}>
            <div className={styles.headerRow}>
              <div>
                <h3 className={styles.title}>Personal Profile</h3>
                <p className={styles.desc}>
                  {role === "student" && "Access your enrolled courses, grades, and fee details here."}
                  {role === "admin" && "Manage users, courses, and overall system operations."}
                  {role === "dean" && "Oversee faculty, approve programs, and track research performance."}
                  {role === "owner" && "Monitor university-wide metrics, finances, and growth."}
                </p>
              </div>

              <div className={styles.actionBtns}>
                <button className={styles.outlineBtn}>Edit</button>
                <button className={styles.fillBtn}>Save</button>
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoBox}>
                <h4>About</h4>
                <div className={styles.infoItem}>
                  <h5>Location</h5>
                  <p>haripur</p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <h4>Contact</h4>
                <ContactRow label="Email" value={email} />
                <ContactRow label="Phone" value="9769" />
              </div>
            </div>

            {role === "student" && (
              <div className={styles.skillsSection}>
                <h4>Skills</h4>
                <div className={styles.skillsRow}>
                  {["React", "Java", "SQL"].map((s) => (
                    <Pill key={s} label={s} />
                  ))}
                </div>
              </div>
            )}

            {role === "admin" && (
              <div className={styles.skillsSection}>
                <h4>Admin Tools</h4>
                <div className={styles.skillsRow}>
                  {["User Management", "Reports", "Security"].map((s) => (
                    <Pill key={s} label={s} />
                  ))}
                </div>
              </div>
            )}

            {role === "DEAN" && (
              <div className={styles.skillsSection}>
                <h4>Dean Tools</h4>
                <div className={styles.skillsRow}>
                  {["Faculty Review", "Research Oversight", "Curriculum"].map((s) => (
                    <Pill key={s} label={s} />
                  ))}
                </div>
              </div>
            )}

            {role === "owner" && (
              <div className={styles.skillsSection}>
                <h4>Owner Tools</h4>
                <div className={styles.skillsRow}>
                  {["Financial Reports", "Growth", "Analytics"].map((s) => (
                    <Pill key={s} label={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}

function ContactRow({ label, value }) {
  return (
    <div className={styles.contactRow}>
      <div>{label}</div>
      <div className={styles.contactValue}>{value}</div>
    </div>
  );
}

function Pill({ label }) {
  return <div className={styles.pill}>{label}</div>;
}