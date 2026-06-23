import { useState, useEffect } from "react";
import axios from "axios";

export const useDBpedia = (title, year = null) => {
  const [dbpediaData, setDbpediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("/.netlify/functions/dbpediaInfo", {
          title,
          year,
        });
        const data = response.data;
        const normalize = (field) => {
          if (!field) return [];
          return Array.isArray(field) ? field : [field];
        };
        setDbpediaData({
          ...data,
          director: normalize(data.director),
          starring: normalize(data.starring),
          producer: normalize(data.producer),
          writer: normalize(data.writer),
          genre: normalize(data.genre),
        });
      } catch (err) {
        console.error("DBpedia error:", err);
        setError(err.message || "Unknown error");
        setDbpediaData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [title, year]);

  return { dbpediaData, loading, error };
};
