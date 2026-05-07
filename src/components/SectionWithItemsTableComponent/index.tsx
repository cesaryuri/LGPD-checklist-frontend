import styled, { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../../templates/SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { PrincipleDTO } from '../../dtos/principleDTO'

interface SectionWithItemsTableComponentProps {
  isMandatory: boolean
  principles: PrincipleDTO[]
  style?: CSSProperties
  title?: string
  isReport?: boolean
}

export function SectionWithItemsTableComponent({
  isMandatory,
  principles,
  style,
  title,
  isReport = false,
}: SectionWithItemsTableComponentProps) {
  const { filteredChecklist } = useChecklists()

  const hasAnyItemInPrinciple = (principleId: number) => {
    return filteredChecklist(isMandatory, principleId).length > 0
  }

  return (
    <SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {principles.map((principle, idx) => {
        return hasAnyItemInPrinciple(principle.id) ? (
          <SectionContainer
            key={principle.id + String(isMandatory) + idx}
            style={style}
          >
            <SectionTitleComponent text={principle.name} isSecondary />
            <ItemsContainer>
              <ItemsTableComponent
                isMandatory={isMandatory}
                principleId={principle.id}
                isReport={isReport}
              />
            </ItemsContainer>
          </SectionContainer>
        ) : (
          <></>
        )
      })}
    </SectionWithItemsTable>
  )
}

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    overflow: scroll;
  }
`

interface SectionWithItemsTableProps {
  $isReport: boolean
}

const SectionWithItemsTable = styled.div<SectionWithItemsTableProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isReport }) => ($isReport ? '2rem' : '0')};
`
