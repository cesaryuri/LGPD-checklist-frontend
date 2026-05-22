import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useState } from 'react'
import { useLoadChecklist } from '../../hooks/loadChecklist'

export function Home() {
  const [pressed, setPressed] = useState(0)
  useLoadChecklist()

  return (
    <MainContainer>
      <Instructions />
      <UserForm submitted={pressed} />
      <ActionsFooterContainer>
        <div />
        <ButtonComponent
          text="Começar"
          action={() => {
            setPressed((state) => state + 1)
          }}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
