import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import SearchInput from "@/components/SearchInput";
import Router from "next/router";
import { styled } from "@mui/material/styles";

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

  const Root = styled("div")(({ theme }) => ({
    margin: "auto",
    maxWidth: 800,
    padding: theme.spacing(2),
  }));

  const Title = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(2, 0),
  }));

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
  });

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(2, 0),
  }));

  return (
    <Root>
      <SearchInput onSubmit={handleSubmit} />
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <Title variant="h5" component="h2">
            Search Results for {query}
          </Title>
          {data.length === 0 && (
            <Typography variant="body1" component="p">
              No se encontraron resultados para {query}.
            </Typography>
          )}
          <List>
            {data.map(({ title, content, url }, index) => (
              <ListItem key={index}>
                <Typography variant="h5" component="h2">
                  <a href={url} target="_blank" rel="noopener">
                    {title}
                  </a>
                </Typography>
                <Typography variant="body1" component="p">
                  {truncateText(content, 150)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Root>
  );
};

export default SearchResults;
