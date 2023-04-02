import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import Router from "next/router";

const SearchResults = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.nickravchenko.rocks/api/search/?q=${query}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data.results); // verifica si los resultados son devueltos correctamente
        setData(data.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substr(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  const handleSubmit = (event, inputValue) => {
    event.preventDefault();
    Router.push(`/search/${inputValue}`);
  };

  return (
    <div>
      <SearchInput onSubmit={handleSubmit} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Search Results for {query}</h1>
          <ul>
            {data.map(({ title, content, url }, index) => (
              <li key={index}>
                <Link href={url}>{title}</Link>
                <p>{truncateText(content, 150)}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
