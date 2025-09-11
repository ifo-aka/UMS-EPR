import { useEffect, useState } from "react";
import styles from "../StyleSheets/SignUp.module.css";
import { useRef } from "react";
import { Form,useNavigate } from "react-router-dom";
import Container from "./Container";
import InfoUtility from "../store/InfoUtility";
const SignUp = () => {
  let [showErrorMessage, setShowErrorMessage] = useState(false);
  let [bothSame, setBothSame] = useState(null);
  let [handleErrorHeading, setHandleErrorHeading] = useState(null);
  let [handleErrorMessage, setHandleErrorMessage] = useState(null);
  let [password, setPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);
let  [isPasswordValid, setIsPasswordValid] = useState(null);
const [isPassOkToSubmit,setIsPassOkToSubmit] = useState(false);
  const navigate = useNavigate();

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
useEffect(() => {
    if(!password){
        setIsPasswordValid(null)
    }
    if (password && password.length >= 8) {
  setIsPasswordValid(passwordRegex.test(password));
  if(!passwordRegex.test(password)){
    setHandleErrorHeading("Weak password");
    setHandleErrorMessage("please pick strong password")
    handleError();
  }
    }

}, [password]);
 console.log(isPasswordValid)

  const formRef = useRef(null);


  useEffect(() => {
    if (!password || !confirmPassword) {
      setBothSame(null);
      return;
    }
    if (password !== confirmPassword && !password.startsWith(confirmPassword)) {
      setBothSame(false);
      setIsPassOkToSubmit(false)
      setHandleErrorHeading("Password Mismatch");
      setHandleErrorMessage("Passwords do not match");

      return;
    }
    if (password == confirmPassword) {
      setBothSame(true);
      setIsPassOkToSubmit(true)
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    if (!bothSame) {
    }
  }, [bothSame]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    let username = formRef.current.elements.name.value;
    let email = formRef.current.elements.email.value;
    let role = formRef.current.elements.role.value;
    let password = formRef.current.elements.password.value;
    console.log("ok" + isPassOkToSubmit)
    if(isPassOkToSubmit){
      console.log(role)
        if(role == "user"){
          
        }
        else if (role == "student"){
          navigate("/StudentDetail",{state : {studentDetails: {username, email, role, password}}})

        }
    }else{
        setHandleErrorHeading("Password Mismatch")
        setHandleErrorMessage("please match your password ")

        handleError();
        return
    }
  };

  const handleError = () => {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  return (
    
    <Container>
      <Form className={styles.form} onSubmit={handleSignUp} ref={formRef}>
        <h2 className={styles.heading}>Lets make your account</h2>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="role">
            Select Role ( If you are teacher or Dean select user )
          </label>
          <select id="role" name="role" required>
            <option value="student">Student</option>
            <option value="user">User(admin will choose your role)</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="password">
            Password (at least 1 uppercase, 1 special character, 1 number, min 8
            chars)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className={
              isPasswordValid === false
                ? styles.warning
                : isPasswordValid === true
                ? styles.success
                : ""
            }
          />
          {isPasswordValid === false &&  isPasswordValid != null &&(
            <p className={styles.warningText}>
              Password must contain an uppercase, number, special char, and 8+
              length
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={!bothSame && bothSame !== null ? styles.warning : ""}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!bothSame && bothSame !== null && 
          <p className={styles.passwordMisMatch}>
            Passwords do not match
          </p>}
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </Form>
      {showErrorMessage && (
        <InfoUtility info={{message:`${handleErrorMessage}`,heading: handleErrorHeading,bgColor :"red"}} />
      )}
    </Container>
  );
};
export default SignUp;
