import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
//express initialization
const app = express();

//PORT
const PORT = 4000;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

//localhost setup
app.listen(PORT, () => {
  console.log("Graphql server now up at port 4000");
});
