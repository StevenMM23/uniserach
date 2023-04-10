// pages/search/[query].js

import { useRouter } from "next/router";
import SearchResults from "./SearchResults";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  
  return (
    <div>
      <SearchResults query={query} />
    </div>
  );
}
