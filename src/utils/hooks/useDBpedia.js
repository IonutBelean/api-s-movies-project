// utils/hooks/useDBpedia.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useDBpedia = (title) => {
  const [dbpediaData, setDbpediaData] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchData = async () => {
      try {
        const response = await axios.post("/.netlify/functions/dbpediaInfo", {
          title,
        });
        setDbpediaData(response.data);
      } catch (err) {
        console.error("DBpedia error:", err);
      }
    };

    fetchData();
  }, [title]);

  return dbpediaData;
};
