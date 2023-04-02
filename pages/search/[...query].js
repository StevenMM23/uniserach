// pages/search/[query].js

import { useRouter } from "next/router";
import SearchResults from "./SearchResults";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  
  return (
    <div>
      <h1>Search Results for {query}</h1>
      <SearchResults query={query} />
    </div>
  );
}
