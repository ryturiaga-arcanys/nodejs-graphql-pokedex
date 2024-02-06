import { createHandler } from 'graphql-http/lib/use/express';
import app from './app.js';
import pokedexSchema from './schema/pokemon.js';

const port = process.env.PORT

app.get('/', createHandler({
  schema: pokedexSchema,
}))

app.post('/', createHandler({
  schema: pokedexSchema,
}))

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
