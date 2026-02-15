import { defineQuery } from 'next-sanity'

export const INSTITUCIONES_QUERY = defineQuery(`*[_type == "institucion"] | order(order asc)`)

export const INSTITUCION_BY_SLUG_QUERY = defineQuery(`*[_type == "institucion" && slug.current == $slug][0]`)

export const INSTITUCIONES_BY_CITY_QUERY = defineQuery(`*[_type == "institucion" && ciudad == $ciudad] | order(order asc)`)

export const INSTITUCIONES_BY_CATEGORY_QUERY = defineQuery(`*[_type == "institucion" && $categoria in categorias] | order(order asc)`)

export const INSTITUCIONES_BY_CITY_AND_CATEGORY_QUERY = defineQuery(`*[_type == "institucion" && ciudad == $ciudad && $categoria in categorias] | order(order asc)`)
