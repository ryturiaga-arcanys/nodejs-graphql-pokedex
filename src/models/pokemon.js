import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
  id: Number,
  num: String,
  name: String,
  img: String,
  type: Array,
  height: String,
  weight: String,
  candy: String,
  candy_count: Number,
  egg: String,
  spawn_chance: mongoose.Types.Decimal128,
  avg_spawns: mongoose.Types.Decimal128,
  spawn_time: String,
  multipliers: Array,
  weaknesses: Array,
  prev_evolution: Array,
  next_evolution: Array,
}, {
  versionKey: false,
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon')

export default Pokemon
