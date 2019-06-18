import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { gql } from "apollo-boost";
import Characters from "./components/Characters";
import "./App.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

// client
//   .query({
//     query: gql`
//       query {
//         characters(page: 2, filter: { name: "rick" }) {
//           info {
//             count
//           }
//           results {
//             name
//           }
//         }
//         character(id: 1) {
//           id
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <h1 className="container">Rick and Morty</h1>
      <Characters />
    </ApolloProvider>
  );
}

export default App;
