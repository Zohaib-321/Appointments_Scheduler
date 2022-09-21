const { db } = require("../check/pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { UserType, ProjectType, jobType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM project WHERE id=$1`;
        const values = [args.id];
        console.log(values);
        console.log(parentValue);

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    job: {
      type: jobType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM job WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
  },
});

exports.query = RootQuery;

/*
{
  project(id: 2) {
    title
    description
  }
}
*/
