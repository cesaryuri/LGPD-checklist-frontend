import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useToast } from '../../contexts/ToastContext'
import { useLoadChecklist } from '../../hooks/loadChecklist'

export function ChecklistItems() {
  const { validateChecklist, uniquePrinciples } = useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const { id } = useLoadChecklist()

  const validateChecklistItems = () => {
    const messageError = validateChecklist()

    if (!messageError) {
      if (id) {
        navigate(`/report/${id}`)
      } else {
        navigate('/report')
      }
    } else {
      toastError(messageError)
    }
  }

  return (
    <ItemsTablePageComponent
      text="Itens"
      principles={uniquePrinciples()}
      action={validateChecklistItems}
    />
  )
}
