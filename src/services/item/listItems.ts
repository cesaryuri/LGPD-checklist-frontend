import { ItemDTO } from '../../dtos/itemDTO'
import api from '../../libs/api'

export const listItemsServiceDefaultErrorMessage =
  'Não foi possível carregar os items da checklist. Tente novamente mais tarde.'

interface listItemsServiceResponse {
  items: ItemDTO[]
}

export const listItemsService = async (
  deviceType: string,
): Promise<listItemsServiceResponse> => {
  const params: Record<string, string> = {}
  params.deviceType = deviceType
  const { data } = await api.get(`/items`, { params })

  return data
}
