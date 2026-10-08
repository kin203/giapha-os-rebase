import { Relationship } from '@/types'
import { PublicRelationship } from '../types/public-relationship'

export function toPublicRelationship(relationship: Relationship): PublicRelationship {
  return {
    id: relationship.id,
    type: relationship.type,
    person_a: relationship.person_a,
    person_b: relationship.person_b,
  }
}
