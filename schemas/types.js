const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    joined: { type: GraphQLString },
    last_logged_in: { type: GraphQLString },
  },
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    creator_id: { type: GraphQLString },
    created: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const jobType = new GraphQLObjectType({

    name: "Job",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        position: {type: GraphQLString},
        type: {type: GraphQLString},
        salaray: {type: GraphQLString},
        project_id: {type: GraphQLString}
    },
}); 

const availabilityType = new GraphQLObjectType({

    name: "provider_availablity",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        start: {type: GraphQLString},
        endtime: {type: GraphQLString},
        providerid: {type: GraphQLString},
        googlecalendarid: {type: GraphQLString}
    },
}); 

exports.UserType = UserType;
exports.ProjectType = ProjectType;
exports.jobType = jobType;
exports.availabilityType = availabilityType;