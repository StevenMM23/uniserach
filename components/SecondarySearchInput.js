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
const SearchInput = styled(InputBase)({
  marginLeft: "10px",
  flex: 1,
  fontFamily: "Roboto, sans-serif",
  // Agregamos estilos para pantallas más pequeñas
  "@media (max-width: 768px)": {
    marginBottom: "10px",
  },
});
const UniSearch = styled("h1")({
  fontSize: "10rem",
  textAlign: "center",
  margin: "0",
  padding: "0",
  // Agregamos estilos para pantallas más pequeñas
  "@media (max-width: 768px)": {
    fontSize: "6rem",
  },
});

const SearchButton = styled(IconButton)({
  padding: "10px",
  marginLeft: "5px",
  backgroundColor: "#f2f2f2",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#e8e8e8",
  },
});

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery !== "") {
      router.push(`/search/${searchQuery}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <UniSearch>UNISEARCH</UniSearch>
      <SearchContainer>
        <SearchInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
