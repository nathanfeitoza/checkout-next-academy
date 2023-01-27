export interface City {
  id: number
  nome: string
  municipio: Municipality
}

export interface Municipality {
  id: number
  nome: string
  microrregiao: MicroRegion
  "regiao-imediata": ImmediateRegion
}

export interface MicroRegion {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

export interface Mesorregiao {
  id: number
  nome: string
  UF: Uf
}

export interface Uf {
  id: number
  sigla: string
  nome: string
  regiao: Region
}

export interface Region {
  id: number
  sigla: string
  nome: string
}

export interface ImmediateRegion {
  id: number
  nome: string
  "regiao-intermediaria": IntermediateRegion
}

export interface IntermediateRegion {
  id: number
  nome: string
  UF: Uf
}

export interface IbgeCitiesRespose {
  data: City[]
}