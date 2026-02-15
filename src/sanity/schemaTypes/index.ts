import { type SchemaTypeDefinition } from 'sanity'
import { institucionType } from './institucion'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [institucionType],
}
