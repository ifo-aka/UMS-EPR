// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 // adjust path if needed
import { fetchStudents as dbFetchStudents ,  login as dbLogin,signupStudent as dbSignUpStudent, authenticationCheck as dbAuthenticationheck, authenticationCheck } from "../DbQuery";
import { fetchStudentsThunk } from "./studentSlice";
import { AwardIcon } from "lucide-react";
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await dbSignUpStudent(userData);
  

      // ✅ Explicitly check backend success flag
      if (!response.success) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      return rejectWithValue({ success: false, error: error.message });// return consistent error object
    }
  }
);
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await dbLogin(email, password);
      if (data?.data?.token) {
        // after login, fetch first students page
        // dispatch(fetchStudentsThunk({ page: 0, size: 10, sortBy: "id" }));

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role || "Guest");
        // dispatch(authSlice.actions.setRole(role))
      
      if (data?.error) {
        return rejectWithValue(data.error);
      }
      if (data?.status) {
        return rejectWithValue({ error: "Unknown error", status: data.status });
      }
        return data;
      }
      return rejectWithValue(data);
    } catch (err) {
      return rejectWithValue({ success: false, error: err.message });
    }
  }
);

// Optionally expose a thunk to check localStorage and restore
export const restoreAuthFromLocalStorage = createAsyncThunk(
  "auth/restore",
  async (_, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      return { token, role: role || "Guest" };
    }
    return { token: null, role: null };
  }
);
export const checkSessionValidation= createAsyncThunk(
  "auth/me",
  async(_,{dispatch,getState})=>{
    const res = await dbAuthenticationheck();
    if(res.error){
      rejectWithValue(res.error)
      return;
    }
  return res;

  }
)

// We reference fetchStudentsThunk, but define it in studentsSlice and import it there.
// To avoid circular imports we will dispatch fetchStudentsThunk by string or the students thunk
// Ensure studentsSlice exports fetchStudentsThunk (see studentsSlice.js)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: "GUEST",
    isAuthenticated: false,
 
    authChecked: false,
    showSpinner: false,
    loginError: null,
    userObject : {
     id : null,
     username : "",
     email: "",
     role : "",
    }
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      state.token = null;
      state.role = "GUEST";
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    setShowSpinner(state, action) {
      state.showSpinner = !!action.payload;
    },
    setAuthChecked(state, action) {
      state.authChecked = !!action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
      state.isAdmin = ((action.payload || "").toUpperCase() === "ADMIN");
    },
    setToken(state, action) {
      state.token = action.payload.toUpperCase();
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(signupThunk.fulfilled ,(state,action)=>{
  
      const {role,token} = action.payload.data;
      localStorage.setItem("token",token);
      localStorage.setItem("role",role.toUpperCase() || "GUEST");
      state.showSpinner=false;
      state.authChecked = true;
      state.isAuthenticated=true;
      state.role=  role.toUpperCase();


    })
      .addCase(loginThunk.pending, (state) => {
        state.showSpinner = true;
        state.authChecked = false;
        state.loginError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token, role,id,username,email } = action.payload.data;
      
        state.token = token;
        state.role = role || "Guest";
        state.userObject = {id,username,role,email};
        state.isAuthenticated = true;
        state.isAdmin = ((role || "").toUpperCase() === "ADMIN");
        state.authChecked = true;
        state.showSpinner = false;
        // persist token
        if (token) localStorage.setItem("token", token);
        if (role) localStorage.setItem("role", role);
        console.log(state.userObject);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.authChecked = true;
        state.showSpinner = false;
        state.loginError = action.payload || action.error;
      })
      .addCase(restoreAuthFromLocalStorage.fulfilled, (state, action) => {
        const { token, role } = action.payload;
        state.token = token;
        if(role){
               state.role = role.toUpperCase()
        }else{
            state.role = "GUEST";
        }
         
        state.isAuthenticated = !!token;
        state.isAdmin = ((role || "").toUpperCase() === "ADMIN");
        state.authChecked = true;
      })
      .addCase(checkSessionValidation.fulfilled,(state,action)=>{
        console.log(action);
        
       state.userObject = action.payload.data;
      })
  },
});

export const { logout, setShowSpinner, setAuthChecked, setRole, setToken } =
  authSlice.actions;

export default authSlice.reducer;
