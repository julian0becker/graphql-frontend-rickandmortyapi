import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export default function Characters() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [page, setPage] = useState(1);
  const search = gql`
    query($name: String!, $page: Int!) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          next
          prev
        }
        results {
          id
          name
          image
        }
      }
      character(id: 1) {
        id
      }
    }
  `;

  const handleSearch = e => {
    e.preventDefault();
    if (!e.target.search.value.trim()) return;
    setSearchTerm(e.target.search.value);
    setPage(1);
    e.target.search.value = "";
  };

  const incrementPage = () => {
    let currentCount = page;
    currentCount++;
    setPage(currentCount);
  };

  console.log(page);
  return (
    <React.Fragment>
      <form
        className="form-group d-flex container"
        onSubmit={e => handleSearch(e)}
      >
        <input className="form-control w-50" type="text" name="search" />
        <input type="submit" value="search" className="btn btn-primary" />
        {searchTerm && (
          <button className="btn btn-primary" onClick={incrementPage}>
            Next
          </button>
        )}
      </form>

      {searchTerm && (
        <React.Fragment>
          <Query query={search} variables={{ name: searchTerm, page: page }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Characters are loading...</p>;
              if (error) return <p>an error has occurred</p>;
              console.log(data);
              if (data.characters.info.count) {
                return (
                  <div className="container d-flex flex-wrap">
                    {data.characters.results.map(character => (
                      <div className="m-2">
                        <h4 key={character.id}>{character.name}</h4>
                        <img src={character.image} />
                      </div>
                    ))}
                  </div>
                );
              } else {
                return <h2 className="container">No Results</h2>;
              }
            }}
          </Query>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
