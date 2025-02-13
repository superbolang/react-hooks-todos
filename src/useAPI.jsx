import { useState, useEffect } from "react";
import axios from "axios";

const useAPI = (endpoint) => {
  const [data, setDAta] = useState([]); // initial state empty array

  // to call data when component is mounted
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setDAta(response.data);
  };

  return data;
};

export default useAPI;
