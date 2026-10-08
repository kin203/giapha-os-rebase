import { Person } from '@/types'
import { PublicPerson } from '../types/public-person'

export function toPublicPerson(person: Person): PublicPerson {
  return {
    id: person.id,
    full_name: person.full_name,
    gender: person.gender,

    birth_year: person.birth_year,
    birth_month: person.birth_month,
    birth_day: person.birth_day,

    death_year: person.death_year,
    death_month: person.death_month,
    death_day: person.death_day,

    death_lunar_year: person.death_lunar_year,
    death_lunar_month: person.death_lunar_month,
    death_lunar_day: person.death_lunar_day,

    is_deceased: person.is_deceased,
    is_in_law: person.is_in_law,

    birth_order: person.birth_order,
    generation: person.generation,
    other_names: person.other_names,

    avatar_url: person.avatar_url,
  }
}
