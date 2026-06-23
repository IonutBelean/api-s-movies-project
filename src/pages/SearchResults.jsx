import { useLocation } from "react-router-dom";
import { getSearchEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import Layout from "../components/Layout";
import MoviesCardList from "../components/MoviesCardList";
import { Container } from "react-bootstrap";

const SearchResults = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchQuery = queryParams.get("query") || "";
  const searchEndpoint = getSearchEndpoint(searchQuery);
  const data = useFetch(searchEndpoint);

  return (
    <Layout>
      <Container>
        <h1 className="text-center my-4">Search results for "{searchQuery}"</h1>
        {!data ? (
          <p className="text-center">Loading...</p>
        ) : data.results?.length > 0 ? (
          <MoviesCardList data={data.results} />
        ) : (
          <p className="text-center">No results found for "{searchQuery}".</p>
        )}
      </Container>
    </Layout>
  );
};

export default SearchResults;
