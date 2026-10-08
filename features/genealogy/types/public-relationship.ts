import { RelationshipType } from '@/types'

export interface PublicRelationship {
  id: string
  type: RelationshipType
  person_a: string
  person_b: string
}
