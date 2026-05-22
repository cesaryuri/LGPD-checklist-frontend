import { useNavigate, useParams } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import styled from 'styled-components'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { CheckboxComponent } from '../../components/CheckboxComponent'
import { useEffect, useState } from 'react'
import { AppError } from '../../utils/AppError'
import { useToast } from '../../contexts/ToastContext'
import {
  listDevicesService,
  listDevicesServiceDefaultErrorMessage,
} from '../../services/device/listDevices'
import { DeviceDTO } from '../../dtos/deviceDTO'

export function DevicesFamilies() {
  const { deviceType, onSetDeviceType, fetchItems } = useChecklists()
  const { toastError, toastWarn } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()
  const [allDevices, setAllDevices] = useState<DeviceDTO[]>([])
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('')

  const goToChecklistItems = () => {
    if (id) {
      navigate(`/checklist-items/${id}`)
    } else {
      navigate('/checklist-items')
    }
  }

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await listDevicesService()
        setAllDevices(data.devices)
        // If context has devices, set selected device to the first one
        if (deviceType) {
          setSelectedDeviceType(String(deviceType))
        }
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : listDevicesServiceDefaultErrorMessage
        toastError(title)
      }
    }
    fetchDevices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeviceRadioChange = (deviceType: string) => {
    setSelectedDeviceType(String(deviceType))
  }

  const handleContinue = async () => {
    if (!selectedDeviceType) {
      toastWarn('Selecione uma família de dispositivos antes de continuar.')
      return
    }

    const filteredDevice = allDevices.find(
      (device) => String(device.name) === selectedDeviceType,
    )
    const items = await fetchItems(filteredDevice!)

    if (items && items.length === 0) {
      toastWarn(
        'Nenhum item de checklist encontrado para os filtros escolhidos.',
      )
    } else if (items) {
      goToChecklistItems()
    }
    onSetDeviceType(filteredDevice!.name)
  }

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <ChecklistFamiliesContainer>
          <p>
            Selecione abaixo qual família de dispositivos você quer incluir
            nessa avaliação:
          </p>
          <form>
            {allDevices &&
              allDevices.length > 0 &&
              allDevices.map((device) => (
                <CheckboxComponent
                  key={device.name}
                  type="radio"
                  name="device"
                  value={String(device.name)}
                  checked={selectedDeviceType === String(device.name)}
                  labelText={device.name}
                  onChange={() => handleDeviceRadioChange(device.name)}
                />
              ))}
          </form>
        </ChecklistFamiliesContainer>
      </SectionContainer>
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={handleContinue} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}

const ChecklistFamiliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'],
    input[type='radio'] {
      width: 1.25rem;
      height: 1.25rem;
      accent-color: ${({ theme }) => theme.colors.contrast};
    }
  }
`
