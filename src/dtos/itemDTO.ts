import { DeviceDTO } from './deviceDTO'
import { PrincipleDTO } from './principleDTO'

export type ItemDTO = {
  id: number
  code: string
  itemDesc: string
  recommendations: string
  isMandatory: boolean
  principle: PrincipleDTO
  devices?: DeviceDTO[]
}
