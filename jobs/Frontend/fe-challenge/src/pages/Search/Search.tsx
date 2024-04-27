import { Suspense, useEffect, useState } from 'react';
import SearchResult from '@/pages/Search/components/SearchResult';
import Loading from '@/pages/Loading';
import SearchInput from '@/components/SearchInput';
import useDebounceValue from '@/hooks/useDebounceValue';
import EmptySearch from '@/pages/Search/components/EmptySearch';
import useQuerySearch from '@/pages/Search/hooks/useQuerySearch';

const Search = () => {
  const { querySearch, setQuerySearch } = useQuerySearch();
  const [query, setQuery] = useState(querySearch || '');
  const debouncedQuery = useDebounceValue<string | undefined>(
    query,
    querySearch,
  );

  useEffect(() => {
    if (querySearch !== debouncedQuery) {
      setQuerySearch(debouncedQuery || '');
    }
  }, [debouncedQuery, setQuerySearch, querySearch]);

  return (
    <div>
      <SearchInput
        placeholder="Search movies..."
        className="w-full mb-12"
        value={query}
        onChange={(value) => setQuery(value)}
      />
      {debouncedQuery ? (
        <Suspense fallback={<Loading />}>
          <SearchResult query={debouncedQuery} />
        </Suspense>
      ) : (
        <EmptySearch>
          <EmptySearch.Title>Explore movies</EmptySearch.Title>
          <EmptySearch.Description>
            Use the search bar above
          </EmptySearch.Description>
        </EmptySearch>
      )}
    </div>
  );
};
export default Search;
