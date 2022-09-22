const graphql = require("graphql");
const db = require("../check/pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const { ProjectType, jobType, availabilityType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        creatorId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) `;
        const values = [
          args.creatorId,
          new Date(),
          args.title,
          args.description,
        ];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    addJob: {
      type: jobType,
      args: {
        position: { type: GraphQLString },
        type: { type: GraphQLString },
        salaray: { type: GraphQLInt },
        project_id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO job(position, type, salaray, project_id) VALUES ($1, $2, $3, $4) RETURNING type`;
        const values = [
          args.position,
          args.type,
          args.salaray,
          args.project_id,
        ];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    addAvailability: {
      type: availabilityType,
      args: {
        providerid: { type: GraphQLInt },
        googlecalendarid: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO availabilities(start, endtime, providerid, googlecalendarid) VALUES ($1, $2, $3, $4) RETURNING start`;
        const values = [
          new Date(),
          new Date(),
          args.googlecalendarid,
          args.providerid,
        ];
        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
  },
});

exports.mutation = RootMutation;

/*test with 

mutation {
  addProject(creatorId: 1, title: "Test Project", description: "A test project") {
    title
  }
}
mutation {
  addJop(position: "full stack", type: "full time", salaray: 300000000, 1){
    type
  }
}

{
  project(id: 2) {
    title
    description
  }
}

*/
