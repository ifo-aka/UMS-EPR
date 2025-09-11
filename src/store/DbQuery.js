const BASE_URL = "http://localhost:8080";

// 🔹 Token helpers
const getToken = () => localStorage.getItem("token");

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : null;
};

// 🔹 Generic fetch wrapper
const apiFetch = async (endpoint, { authRequired = false, options = {} }) => {
  const token = getToken();
  if (!token && authRequired) {
    return { error: "No token", status: 401 };
  }

  try {
    const resp = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(authRequired ? authHeaders() : {}),
      },
    });

    if ([401, 403].includes(resp.status)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        error: resp.status === 401 ? "Unauthorized" : "Forbidden",
        status: resp.status,
      };
    }

    if (resp.status === 400) {
      const json = await resp.json().catch(() => null);
      return { error: "Bad Request", status: 400, details: json };
    }

    return await resp.json();
  } catch (e) {
    console.error("API Error:", e);
    return { error: e.message };
  }
};

// --------------------- API FUNCTIONS ---------------------

export const signupStudent = async (signupStudentObject) =>
  apiFetch("/auth/signup/student", {
    options: {
      method: "POST",
      body: signupStudentObject, // already FormData
    },
  });

export const authenticationCheck = async () =>
  apiFetch("/auth/check", {
    authRequired: true,
    options: { method: "GET" ,  headers: { "Content-Type": "application/json" }, },
  });

export const addOneStudent = async (studentObject) =>
  apiFetch("/student", {
    authRequired: true,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentObject),
    },
  });

export const fetchStudents = (page = 0, size = 5, sortBy = "id") =>
  apiFetch(`/student/students?page=${page}&size=${size}&sortBy=${sortBy}`, {
    authRequired: true,
    options: { method: "GET" },
  });

export const login = async (email, password) => {
  try {
    const resp = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!resp.ok) {
      const body = await resp.text().catch(() => null);
      return { success: false, error: "Login failed", status: resp.status, body };
    }
    return await resp.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchLastPage = (totalPages) =>
  apiFetch(`/student/students?page=${Math.max(totalPages - 1, 0)}&size=5&sortBy=id`, {
    authRequired: true,
    options: { method: "GET" },
  });

export const searchStudents = (filter, value) =>
  apiFetch(`/student/search?filterType=${filter}&value=${value}`, {
    authRequired: true,
    options: { method: "GET" },
  });

export const getNoOfDepartments = () =>
  apiFetch("/student/departments/count", {
    authRequired: true,
    options: { method: "GET" },
  });
