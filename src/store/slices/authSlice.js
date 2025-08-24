// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 // adjust path if needed
import { fetchStudents as dbFetchStudents ,  login as dbLogin} from "../DbQuery";
import { fetchStudentsThunk } from "./studentSlice";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await dbLogin(email, password);
      if (data?.data?.token) {
        // after login, fetch first students page
        // dispatch(fetchStudentsThunk({ page: 0, size: 10, sortBy: "id" }));
        console.log(data.data);
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

// We reference fetchStudentsThunk, but define it in studentsSlice and import it there.
// To avoid circular imports we will dispatch fetchStudentsThunk by string or the students thunk
// Ensure studentsSlice exports fetchStudentsThunk (see studentsSlice.js)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: "Guest",
    isAuthenticated: false,
 
    authChecked: false,
    showSpinner: false,
    loginError: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      state.token = null;
      state.role = "Guest";
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
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.showSpinner = true;
        state.authChecked = false;
        state.loginError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token, role } = action.payload.data;
        console.log(action.payload)
        state.token = token;
        state.role = role || "Guest";
        state.isAuthenticated = true;
        state.isAdmin = ((role || "").toUpperCase() === "ADMIN");
        state.authChecked = true;
        state.showSpinner = false;
        // persist token
        if (token) localStorage.setItem("token", token);
        if (role) localStorage.setItem("role", role);
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
        state.role = role || "Guest";
        state.isAuthenticated = !!token;
        state.isAdmin = ((role || "").toUpperCase() === "ADMIN");
        state.authChecked = true;
      });
  },
});

export const { logout, setShowSpinner, setAuthChecked, setRole, setToken } =
  authSlice.actions;

export default authSlice.reducer;
