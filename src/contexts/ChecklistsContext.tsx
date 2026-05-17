import { ReactNode, createContext, useContext, useState } from 'react'
import { CategoriesType } from '../@types'
import { useUsers } from './UsersContext'
import { useAuth } from './AuthContext'
import {
  getChecklistService,
  getChecklistServiceDefaultErrorMessage,
} from '../services/checklist/getChecklistService'
import { ChecklistDTO, ChecklistItemType } from '../dtos/checklistDTO'
import { AppError } from '../utils/AppError'
import { useToast } from './ToastContext'
import { DeviceDTO } from '../dtos/deviceDTO'
import { PrincipleDTO } from '../dtos/principleDTO'
import {
  listItemsService,
  listItemsServiceDefaultErrorMessage,
} from '../services/item/listItems'
import { getItemValidationMessage } from '../libs/business'

export interface ChecklistsContextType {
  devices: DeviceDTO[]
  principles: PrincipleDTO[]
  categoriesSelected: CategoriesType
  currChecklistId: number | undefined
  filteredChecklist: (principleId?: number) => ChecklistItemType[]
  validateChecklist: () => string | null
  resetChecklist: () => void
  findIndexByCode: (code: string) => number
  onChecklistUpdate: (checklist: ChecklistItemType[]) => void
  updateChecklistRow: (checklist: ChecklistItemType, index: number) => void
  onCategoriesSelectedUpdate: (categoriesSelected: CategoriesType) => void
  loadChecklist: (id: number) => Promise<void>
  fetchItems: (
    _principles: PrincipleDTO[],
    _devices: DeviceDTO[],
  ) => Promise<ChecklistItemType[] | null>
  setCurrChecklistId: React.Dispatch<React.SetStateAction<number | undefined>>
  onSetDevices: (devices: DeviceDTO[]) => void
  onSetPrinciples: (principles: PrincipleDTO[]) => void
  removeDisabledItems: () => void
  uniquePrinciples: () => PrincipleDTO[]
}

const ChecklistsContext = createContext({} as ChecklistsContextType)

interface ChecklistsContextProviderProps {
  children: ReactNode
}

export function ChecklistsContextProvider({
  children,
}: ChecklistsContextProviderProps) {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([])
  const { user, onUserUpdate, setUserSystemId } = useUsers()
  const { toastError } = useToast()
  const { isLogged } = useAuth()

  const [categoriesSelected, setCategoriesSelected] = useState<CategoriesType>({
    Sim: true,
    Não: true,
    'Não se aplica': true,
    'Não Preenchido': true,
  })
  const [devices, setDevices] = useState<DeviceDTO[]>([])
  const [principles, setPrinciples] = useState<PrincipleDTO[]>([])
  const [currChecklistId, setCurrChecklistId] = useState<number | undefined>()

  const findIndexByCode = (code: string) => {
    return checklist.findIndex((item) => item.item.code === code)
  }

  const filteredChecklist = (principleId?: number) => {
    const filtered = checklist.filter(
      (row) =>
        !row.disabled &&
        (principleId === undefined || row.item.principle?.id === principleId) &&
        categoriesSelected[row.answer ? row.answer : 'Não Preenchido'],
    )

    return filtered
  }

  const onChecklistUpdate = (checklist: ChecklistItemType[]) => {
    setChecklist(checklist)
  }

  const updateChecklistRow = (row: ChecklistItemType, index: number) => {
    const checklistCopy = [...checklist]
    if (row.answer !== 'Não') {
      row.severityDegree = undefined
    }
    checklistCopy[index] = row
    setChecklist(checklistCopy)
  }

  const validateChecklist = (): string | null => {
    for (const item of filteredChecklist()) {
      const msg = getItemValidationMessage(item)
      if (msg) return msg
    }
    return null
  }

  const resetChecklist = () => {
    setChecklist([])
    setCategoriesSelected({
      Sim: true,
      Não: true,
      'Não se aplica': true,
      'Não Preenchido': true,
    })
    setPrinciples([])
    setDevices([])
    onUserUpdate({
      ...user,
      name: isLogged ? user.name : '',
      office: isLogged ? user.office : '',
      systemName: undefined,
      systemDesc: undefined,
      system: undefined,
    })
  }

  const onCategoriesSelectedUpdate = (categoriesSelected: CategoriesType) => {
    setCategoriesSelected(categoriesSelected)
  }

  const onSetDevices = (devices: DeviceDTO[]) => {
    setDevices(devices)
  }

  const onSetPrinciples = (principles: PrincipleDTO[]) => {
    setPrinciples(principles)
  }

  const setChecklistLoaded = (checklist: ChecklistDTO) => {
    setChecklist(checklist.checklistItems)
    setUserSystemId(checklist.systemId)
    setPrinciples(checklist.principles ?? [])
    setDevices(checklist.devices ?? [])
  }

  const removeDisabledItems = () => {
    setChecklist((prev) => prev.filter((item) => !item.disabled))
  }

  // Função para retornar seções únicas do checklist filtrado
  const uniquePrinciples = () => {
    return Array.from(
      new Map(
        filteredChecklist().map((item) => [
          item.item.principle.id,
          item.item.principle,
        ]),
      ).values(),
    )
  }

  const loadChecklist = async (id: number) => {
    try {
      setCurrChecklistId(id)
      const data = await getChecklistService(id)

      setChecklistLoaded(data.checklist)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : getChecklistServiceDefaultErrorMessage
      toastError(title)
    }
  }

  const fetchItems = async (_principles = principles, _devices = devices) => {
    try {
      const data = await listItemsService(
        _principles.map((p) => p.id),
        _devices.map((d) => d.id),
      )

      // IDs of items that should be enabled (from API)
      const enabledIds = data.items.map((item) => item.id)

      // 1. Items from API, enabled (merge with previous answers if exist)
      const enabledItems = data.items.map((item) => {
        const existing = checklist.find((c) => c.item.id === item.id)
        return {
          item,
          answer: existing?.answer,
          severityDegree: existing?.severityDegree,
          userComment: existing?.userComment,
          disabled: false,
        }
      })

      // 2. Items that were in checklist but not in API, keep as disabled
      const disabledItems = checklist
        .filter((c) => !enabledIds.includes(c.item.id))
        .map((c) => ({
          ...c,
          disabled: true,
        }))

      // 3. Merge and set
      const merged = [...enabledItems, ...disabledItems]
      setChecklist(merged)
      return merged
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : listItemsServiceDefaultErrorMessage
      toastError(title)
      return null
    }
  }

  return (
    <ChecklistsContext.Provider
      value={{
        devices,
        principles,
        categoriesSelected,
        currChecklistId,
        filteredChecklist,
        validateChecklist,
        resetChecklist,
        onChecklistUpdate,
        updateChecklistRow,
        onCategoriesSelectedUpdate,
        findIndexByCode,
        loadChecklist,
        fetchItems,
        setCurrChecklistId,
        onSetPrinciples,
        onSetDevices,
        removeDisabledItems,
        uniquePrinciples, // <-- adiciona ao contexto
      }}
    >
      {children}
    </ChecklistsContext.Provider>
  )
}

export function useChecklists(): ChecklistsContextType {
  const context = useContext(ChecklistsContext)

  return context
}
