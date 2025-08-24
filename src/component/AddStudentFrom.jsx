import styles from "../StyleSheets/AddStudent.module.css";
import { useRef, useContext, use } from "react";
import { AppContext } from "../store/AppContext";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let AddStudentFrom = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const ageRef = useRef();
    const departmentRef = useRef();


const { studentObject, setStudentObject, addStudent } = useContext(AppContext);
const handleAddStudent = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = Number.parseInt(ageRef.current.value);
    const department = departmentRef.current.value;

    // Frontend validation
    if (!name || name.length < 4) {
        alert("Name must be at least 4 characters and not empty.");
        return;
    }
    if (!department) {
        alert("Department must not be empty.");
        return;
    }
    if (isNaN(age) || age < 17 || age > 100) {
        alert("Age must be a number between 17 and 100.");
        return;
    }
    const newStudent = { name, age, department };
    console.log("Sending student:", newStudent);
    try {
        const res = await addStudent(newStudent); // Await the promise
        console.log("Response from backend:", res);
        if (res && res.success && res.data) {
            alert("Student added successfully! ID: " + res.data.id);
            nameRef.current.value = '';
            ageRef.current.value = '';
            departmentRef.current.value = '';
            // Optionally update context with new student
            setStudentObject(res.data);
            navigate("/");
        } else {
            alert("Failed to add student. Please check your input or try again.");
            console.error("Failed to add student", res);
        }
    } catch (err) {
        alert("Error occurred while adding student.");
        console.error(err);
    }
};
    return (
        <div className={styles.container}>
        <Form className={styles.form} onSubmit={handleAddStudent}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Student Name:</label>
                <input type="text" name="name" className={styles.input} ref={nameRef} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Age:</label>
                <input type="number" name="age" className={styles.input} ref={ageRef} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Department:</label>
                <input type="text" name="department" className={styles.input} ref={departmentRef} />
            </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Father Name:</label>
                <input type="text" name="fatherName" className={styles.input} ref={departmentRef} />
            </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email:</label>
                <input type="text" name="email" className={styles.input} ref={departmentRef} />
            </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Password:</label>
                <input type="text" name="Password" className={styles.input} ref={departmentRef} />
            </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm Password:</label>
                <input type="text" name="confirmPassword" className={styles.input} ref={departmentRef} />
            </div>
            <button type="submit" className={styles.button}>Add Student</button>
        </Form>
        </div>
    );
}

export default AddStudentFrom;
