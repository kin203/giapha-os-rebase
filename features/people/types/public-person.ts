import { Gender } from '@/types'

export interface PublicPerson {
  id: string
  full_name: string
  gender: Gender

  birth_year: number | null
  birth_month: number | null
  birth_day: number | null

  death_year: number | null
  death_month: number | null
  death_day: number | null

  death_lunar_year: number | null
  death_lunar_month: number | null
  death_lunar_day: number | null

  is_deceased: boolean
  is_in_law: boolean

  birth_order: number | null
  generation: number | null
  other_names: string | null

  avatar_url: string | null
}
