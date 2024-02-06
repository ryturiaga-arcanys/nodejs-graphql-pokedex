import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

import Pokemon from '../models/pokemon.js'

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'Represents pokemon data',
  fields: () => ({
    id: { type: GraphQLInt },
    num: { type: GraphQLString },
    name: { type: GraphQLString },
    img: { type: GraphQLString },
    type: { type: new GraphQLList(GraphQLString) },
    height: { type: GraphQLString },
    weight: { type: GraphQLString },
    candy: { type: GraphQLString },
    candy_count: { type: GraphQLInt },
    egg: { type: GraphQLString },
    spawn_chance: { type: GraphQLFloat },
    avg_spawns: { type: GraphQLFloat },
    spawn_time: { type: GraphQLString },
    multipliers: { type: new GraphQLList(GraphQLInt) },
    weaknesses: { type: new GraphQLList(GraphQLString) },
    prev_evolution: { type: new GraphQLList(GraphQLString) },
    next_evolution: { type: new GraphQLList(GraphQLString) },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Pokedex',
  description: 'Pokedex queries',
  fields: () => ({
    pokemon: {
      type: PokemonType,
      description: 'Get details about a pokemon',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, args) => Pokemon.findOne({ id: args.id })
    },
    pokedex: {
      type: new GraphQLList(PokemonType),
      description: 'Get all pokemon',
      args: {
        page: { type: GraphQLInt, defaultValue: 1 },
        limit: { type: GraphQLInt, defaultValue: 10 },
        sort: { type: GraphQLString, defaultValue: 'id' },
        order: { type: GraphQLString, defaultValue: 'ascending' },
        filter: { type: GraphQLString, defaultValue: '' },
      },
      resolve: (_, args) => {
        const filter = args.filter;
        const filterObject = Object.fromEntries(filter.split(', ').map(i => i.split(': ')));

        return Pokemon.find(filterObject)
          .limit(args.limit * 1)
          .skip((args.page - 1) * args.limit)
          .sort({ [args.sort]: args.order })
      },
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

export default schema
