import { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  margin: "0 auto",
  marginTop: "50px",
  padding: "10px",
  backgroundColor: "#f2f2f2",
  borderRadius: "30px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
});

const SearchInput = styled(InputBase)({
  marginLeft: "10px",
  flex: 1,
});

const SearchButton = styled(IconButton)({
  padding: "10px",
});

const UniSearch = styled("h1")({
  fontSize: "5rem",
  textAlign: "center",
  margin: "0",
  padding: "0",
});

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query !== "") {
      router.push(`/search/${query}`);
    }
  };

  return (
    <>
      <UniSearch>UniSearch</UniSearch>
      <form onSubmit={handleSubmit}>
        <SearchContainer>
          <SearchInput
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>
        </SearchContainer>
      </form>
    </>
  );
};

export default Search;
