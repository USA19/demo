"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
//express initialization
var app = express_1.default();
//PORT
var PORT = 4000;
// Construct a schema, using GraphQL schema language
var schema = graphql_1.buildSchema("\n  type Query {\n    hello: String\n  }\n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return "Hello world!";
    },
};
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
//localhost setup
app.listen(PORT, function () {
    console.log("Graphql server now up at port 4000");
});
