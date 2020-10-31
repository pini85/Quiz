import axios from "axios";
const axiosInstance = (token) => {
  console.log("yup");
  axios.create({
    baseURL: "",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosInstance;
