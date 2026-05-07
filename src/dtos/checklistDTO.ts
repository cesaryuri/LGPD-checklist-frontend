import { AnswerType, SeverityDegreeType } from '../@types'
import { DeviceDTO } from './deviceDTO'
import { ItemDTO } from './itemDTO'
import { PrincipleDTO } from './principleDTO'

export type ChecklistItemType = {
  item: ItemDTO
  answer?: AnswerType
  severityDegree?: SeverityDegreeType
  userComment?: string
  disabled?: boolean
}

export type ChecklistDTO = {
  id: number
  userId: number
  systemId: number
  checklistItems: ChecklistItemType[]
  principles: PrincipleDTO[]
  devices: DeviceDTO[]
  createdAt: Date
  updatedAt: Date
}

export type ParsedChecklistDTO = ChecklistDTO & {
  name: string
  createdAtParsed: string
  updatedAtParsed: string
}
