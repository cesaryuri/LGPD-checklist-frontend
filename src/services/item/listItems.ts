import { ItemDTO } from '../../dtos/itemDTO'
import api from '../../libs/api'

export const listItemsServiceDefaultErrorMessage =
  'Não foi possível carregar os items da checklist. Tente novamente mais tarde.'

interface listItemsServiceResponse {
  items: ItemDTO[]
}

export const listItemsService = async (
  principles?: number[],
  devices?: number[],
): Promise<listItemsServiceResponse> => {
  const params: Record<string, string> = {}
  if (principles && principles.length > 0) {
    params.principles = principles.join(',')
  }
  if (devices && devices.length > 0) {
    params.devices = devices.join(',')
  }
  const { data } = await api.get(`/items`, { params })

  return data
}
