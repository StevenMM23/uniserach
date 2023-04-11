import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import WordDefinition from "@/components/WordDefinition";
import { Grid } from "@mui/material";

const SearchResults = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://api.nickravchenko.rocks/api/search/?q=${query}`,
          { headers: { "Content-Type": "application/json" } }
        );
        setData(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchDefinition() {
      try {
        const { data } = await axios.post(`/api/owlbot?q=${query}`);
        console.log(data);
        setDefinitions(() => data);
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchDefinition();
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
    router.push(`/search/${inputValue}`);
  };

  const Root = styled("div")(({ theme }) => ({
    margin: "auto",
    maxWidth: "50%",
    padding: theme.spacing(2),
  }));

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(2, 0),
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      background: "#f2f2f2",
    },
    "& > a": {
      display: "block",
      marginBottom: "10px",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    fontSize: "22px",
    fontWeight: "bold",
  }));

  const Url = styled(Typography)(({ theme }) => ({
    display: "block",
    color: "#666",
    fontSize: "14px",
    marginBottom: "10px",
  }));

  const Content = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    color: "#555",
  }));

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
  });

  const ScrollTopButton = styled("div")({
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    },
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Root>
        <div>
          <SearchInput onSubmit={handleSubmit} />
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress color="primary" />
            </div>
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
                {data.map(({ title, content, url }) => (
                  <ListItem key={uuidv4()}>
                    <Link href={url} passHref target="_blank">
                      <Title variant="h6">{title}</Title>
                    </Link>
                    <Url variant="subtitle2" component="span">
                      {new URL(url).hostname}
                    </Url>
                    <Content variant="body1" component="p">
                      {truncateText(content, 150)}
                    </Content>
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {showScrollTop && (
            <ScrollTopButton onClick={handleScrollTop}>
              <IconButton>
                <KeyboardArrowUpIcon />
              </IconButton>
            </ScrollTopButton>
          )}
        </div>
      </Root>
      <WordDefinition data={data} />
    </div>
  );
};

export default SearchResults;
