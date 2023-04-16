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
  width: "50%",
  margin: "0 auto",
  marginTop: "30px",
  marginBottom: "30px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "25px",
  boxShadow: "0px 1px 6px rgba(32, 33, 36, 0.28)",
  "&:hover": {
    boxShadow: "0px 2px 6px rgba(32, 33, 36, 0.3)",
  },
  "@media (max-width: 768px)": {
    width: "80%",
  },
  "@media (max-width: 480px)": {
    width: "90%",
  },
});

const Container = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh", // changed height to minHeight to avoid content overflow
});

const UniSearch = styled("h1")({
  fontSize: "10rem",
  textAlign: "center",
  margin: "0",
  padding: "0",
  "@media (max-width: 480px)": {
    fontSize: "6rem",
  },
});

const SearchInput = styled(InputBase)({
  marginLeft: "10px",
  flex: 1,
  fontFamily: "Roboto, sans-serif",
});

const SearchButton = styled(IconButton)({
  padding: "10px",
  backgroundColor: "#d9d9d9",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#e8e8e8",
  },
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
  },
});

const StyledButton = styled("button")({
  backgroundColor: "#d9d9d9",
  border: "none",
  borderRadius: "10px",
  color: "#444",
  padding: "20px",
  fontSize: "1.2rem",
  margin: "0 10px",
  "&:hover": {
    backgroundColor: "#e8e8e8",
    cursor: "pointer",
  },
  "@media (max-width: 480px)": {
    margin: "10px 0",
    padding: "10px",
  },
});

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query !== "") {
      router.push(`/search/${query}`);
    }
  };

  const handleSurpriseMe = (e) => {
    e.preventDefault();
    const words = ["Software", "Industrial", "Medicina"];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    router.push(`/search/${randomWord}`);
  };

  return (
    <Container>
      <UniSearch>UNISEARCH</UniSearch>
      <form onSubmit={handleSearch}>
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
      <ButtonContainer>
        <StyledButton onClick={handleSearch}>
          <strong>Buscar con UNISEARCH</strong>
        </StyledButton>
        <StyledButton onClick={handleSurpriseMe}>
          <strong>Sorpréndeme</strong>
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default Search;
