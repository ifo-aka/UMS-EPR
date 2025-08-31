import { Link ,Form} from "react-router-dom";
import styles from "../StyleSheets/Login.module.css";

import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {
 setRole
} from "../store/slices/authSlice";
import { loginThunk } from "../store/slices/authSlice";
import { setShowSpinner } from "../store/slices/authSlice";







const Login = () => {
    const [error,setError] = useState("");
 const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    // emailRef.addEventListener("hover",()=>{
    //     emailRef.current.value="ifham";
    // })
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
       console.log(event)
       
      dispatch( setShowSpinner(true));
        dispatch( loginThunk({email, password}))
        .then((res) =>  res)
        .then((res) => {
          console.log(res.payload);
          if(!res.payload.success){
          const {body} = res.payload;
         let parsedBody = JSON.parse(body)
         setError(parsedBody.message)
         setTimeout(() => {
            setError("")
         }, 2000);
          }
      
         
          

            if (res.success == true ) {
                console.log("navigating")
          
            navigate("/");
   
        // emailRef.current.value="";
        // passwordRef.current.value="";
  console.log("login success")
  
    dispatch( setShowSpinner(false));
  }

           
          
        });

    };
    return (
        
        <div  className={styles.loginContainer}>
            <Form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className={styles.loginTitle}>Login Here To Continue</h2>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className={styles.loginInput}
                    ref={emailRef}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className={styles.loginInput}
                    ref={passwordRef}

                />
                {error &&  <div className="error color-danger" style={{color: "red"}}>
                    {error}
                </div>  }
                <button
                    type="submit"
                    className={styles.loginButton}
                >
                    Login
                </button>
                <div className="signup"
                style={{
                    display:"flex",
                    width: "100%",
                    justifyContent: "center",
                    gap: "10px"
                }}
                >
                     <p>Don't  have an account ? </p><Link to={"/signup"}>signup</Link>
                </div>
               
            </Form>
        </div>
    );
}
export default Login;
