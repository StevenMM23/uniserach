import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTopButton from "@/components/ScrollTopButton";
import IconButton from "@mui/material/IconButton";
import WordDefinition from "@/components/WordDefinition";

const SearchResults = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [definitions, setDefinitions] = useState([]);
  const [image, setImage] = useState("");

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
        const { data } = await axios.get(`/api/owlbot?query=${query}`, {
          headers: { "Content-Type": "application/json" },
        });
        
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
  console.log(definitions);
  const handleSubmit = (event, inputValue) => {
    event.preventDefault();
    router.push(`/search/${inputValue}`);
  };

  const Root = styled("div")(({ theme }) => ({
    margin: "auto",
    maxWidth: "70%",
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

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

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
                {data.map(({ title, content, url }) => (
                  <ListItem key={uuidv4()}>
                    <Link href={url} passHref>
                      <Typography variant="h6" component="a">
                        {title}
                      </Typography>
                    </Link>
                    <Typography variant="body1" component="p">
                      {truncateText(content, 150)}
                    </Typography>
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
      <WordDefinition myData={definitions} query={query} />
      
    </div>
  );
};

export default SearchResults;
