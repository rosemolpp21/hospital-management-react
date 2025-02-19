// import axios, { AxiosResponse, AxiosError} from "axios";

// const authFetch = axios.create({
//   baseURL: "http://localhost:8080", 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// authFetch.interceptors.request.use(
//    (request) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       request.headers.Authorization = `Bearer ${token}`;
//     }
//     return request;
//    }
//   );
  
// authFetch.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => Promise.reject(error)
// );

// export default authFetch;
import axios, { AxiosResponse, AxiosError } from "axios";

const authFetch = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

authFetch.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error: AxiosError) => Promise.reject(error) 
);

authFetch.interceptors.response.use(
  (response: AxiosResponse) => response, 
  (error: AxiosError) => Promise.reject(error)
);

export default authFetch;

