import { useNavigate, useLocation, Form } from "react-router-dom";
import { useRef } from "react";
import styles from "../StyleSheets/SignUp.module.css"; // reuse your signup styling

const StudentDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName: formRef.current.elements.fullName.value,
      fatherName: formRef.current.elements.fatherName.value,
      dob: formRef.current.elements.dob.value,
      cnic: formRef.current.elements.cnic.value,
      gender: formRef.current.elements.gender.value,
      domicile: formRef.current.elements.domicile.files[0],
      phone: formRef.current.elements.phone.value,
      
      matricRoll: formRef.current.elements.matricRoll.value,
      matricBoard: formRef.current.elements.matricBoard.value,
      matricYear: formRef.current.elements.matricYear.value,
      matricMarks: formRef.current.elements.matricMarks.value,
      interRoll: formRef.current.elements.interRoll.value,
      interBoard: formRef.current.elements.interBoard.value,
      interYear: formRef.current.elements.interYear.value,
      interMarks: formRef.current.elements.interMarks.value,
      program: formRef.current.elements.program.value,
      hostel: formRef.current.elements.hostel.checked,
      transport: formRef.current.elements.transport.checked,
      scholarship: formRef.current.elements.scholarship.checked,
    };

    // pass collected data to signup page
    navigate("/signup", { state: { studentDetails: formData } });
  };

  return (
    <div className={styles.container} >
      <Form className={styles.form} ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Student Admission Details</h2>

        {/* Personal Info */}
        <div className={styles.field}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="fatherName">Father / Guardian Name</label>
          <input type="text" name="fatherName" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" name="dob" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="cnic">CNIC / B-Form</label>
          <input type="text" name="cnic" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="gender">Gender</label>
          <select name="gender" required>
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="domicile">Domicile</label>
          <input type="file" name="domicile" required accept=".pdf,.jpg,.jpeg,.png" />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Contact Number</label>
          <input type="tel" name="phone" required />
        </div>

 

        {/* Academic Info */}
        <h3>Matriculation Details</h3>
        <div className={styles.field}>
          <label htmlFor="matricRoll">Roll Number</label>
          <input type="text" name="matricRoll" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="matricBoard">Board</label>
          <input type="text" name="matricBoard" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="matricYear">Passing Year</label>
          <input type="number" name="matricYear" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="matricMarks">Marks / Grade</label>
          <input type="text" name="matricMarks" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="matricCertificate">Matric Certificate</label>
          <input type="file" name="matricCertificate" required accept=".pdf,.jpg,.jpeg,.png" />
        </div>

        <h3>Intermediate / A-Level Details</h3>
        <div className={styles.field}>
          <label htmlFor="interRoll">Roll Number</label>
          <input type="text" name="interRoll" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="interBoard">Board</label>
          <input type="text" name="interBoard" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="interYear">Passing Year</label>
          <input type="number" name="interYear" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="interMarks">Marks / Grade</label>
          <input type="text" name="interMarks" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="interCertificate">Intermediate Certificate</label>
          <input type="file" name="interCertificate" required accept=".pdf,.jpg,.jpeg,.png" />
        </div>

        {/* Program Choice */}
        <h3>Program Choice</h3>
        <div className={styles.field}>
          <label htmlFor="program" id="program-label">Program Applied For</label>
          <select name="program" required>
            <option value="">--Select--</option>
            <option value="bs-cs">BS Computer Science</option>
            <option value="bba">BBA</option>
            <option value="bs-english">BS English</option>
            <option value="bs-physics">BS Physics</option>
          </select>
        </div>

        {/* Additional Needs */}
        <h3>Additional Options</h3>
        <div className={styles.field}>
          <label>
            <input type="checkbox" name="hostel" /> Need Hostel
          </label>
          <label>
            <input type="checkbox" name="transport" /> Need Transport
          </label>
          <label>
            <input type="checkbox" name="scholarship" /> Apply for Scholarship
          </label>
        </div>

        <button type="submit" className={styles.button}>Continue to Signup</button>
      </Form>
    </div>
  );
};

export default StudentDetailPage;
