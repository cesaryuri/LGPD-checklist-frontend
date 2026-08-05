import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useState } from 'react'
import { useLoadChecklist } from '../../hooks/loadChecklist'
import { useTheme } from 'styled-components'

export function Home() {
  const [pressed, setPressed] = useState(0)
  useLoadChecklist()

  const theme = useTheme()

  return (
    <MainContainer>
      <div style={{ margin: '16px 0' }}>
        <p>
          Acesse aqui a checklist geral de conformidade com a LGPD:{' '}
          <a
            href="https://lgpd-checklist.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://lgpd-checklist.vercel.app/
          </a>
        </p>
        <br />
        <span style={{ color: theme.colors.title, fontSize: '14px' }}>
          O usuário criado nesta checklist não estará disponível na checklist do
          link acima. É necessário criar um novo usuário também nessa checklist.
        </span>
      </div>
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
