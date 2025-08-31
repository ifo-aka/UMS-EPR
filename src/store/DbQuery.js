
// NOTE: Remove any AppContext usage from here. This file just talks to the backend.
 
export const  signupStudent= async (signupStudentObject)=>{
      console.log(JSON.stringify(signupStudentObject));
      const url = "http://localhost:8080/auth/signup/student";
      try {
        const response = await fetch(url, {
          method: "POST",
        
          body: signupStudentObject,
        });
        if (!response.ok) {
          const error = await response.json();
          console.log(error)
          return error;
        }
        return await response.json();
      } catch (error) {
        console.error("Error signing up:", error);
        throw error;
      }
};








export const addOneStudent = async (studentObjectfrom) => {
  console.log(JSON.stringify(studentObjectfrom));
  const url = "http://localhost:8080/student";
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token", status: 401 };
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentObjectfrom),
    });
    if (resp.status === 401) {
      // token expired or invalid - don't try to mutate React context here
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return { error: "Unauthorized", status: 401 };
    }
    if (resp.status === 400) {
      console.log("bad request");
      const json = await resp.json().catch(() => null);
      return { error: "Bad Request", status: 400, details: json };
    }
    const result = await resp.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const fetchStudents = async (page = 0, size = 5, sortBy = "id") => {
  const url = `http://localhost:8080/student/students?page=${page}&size=${size}&sortBy=${sortBy}`;
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token", status: 401 };
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 401) {
      localStorage.removeItem("token");
      return { error: "Unauthorized", status: 401 };
    }
    if (resp.status === 403) {
      localStorage.removeItem("token");
      return { error: "Forbidden", status: 403 };
    }
    const result = await resp.json();
    return result;
  } catch (e) {
    console.error("Error fetching data:", e);
    return { error: e.message };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => null);
      console.log("Login response not ok:", response.status, body);
      return { success: false, error: "Login failed", status: response.status, body };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchLastPage = async (totalPages) => {
  const pageToFetch = Math.max(totalPages - 1, 0);
  const url = `http://localhost:8080/student/students?page=${pageToFetch}&size=5&sortBy=id`;
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token", status: 401 };
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 401) {
      localStorage.removeItem("token");
      return { error: "Unauthorized", status: 401 };
    }
    const result = await resp.json();
    return result;
  } catch (error) {
    console.error("Error fetching last page:", error);
    return { error: error.message };
  }
};

export const searchStudents = async (filter, value) => {
  const url = `http://localhost:8080/student/search?filterType=${filter}&value=${value}`;
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token", status: 401 };
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 401) {
      localStorage.removeItem("token");
      return { error: "Unauthorized", status: 401 };
    }
    const result = await resp.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error searching students:", error);
    return { error: error.message };
  }
};

export const getNoOfDepartments = async () => {
  const url = `http://localhost:8080/student/departments/count`;
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token", status: 401 };
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status === 401) {
      localStorage.removeItem("token");
      return { error: "Unauthorized", status: 401 };
    }
    const result = await resp.json();
    return result;
  } catch (error) {
    console.error("Error fetching number of departments:", error);
    return { error: error.message };
  }
};
