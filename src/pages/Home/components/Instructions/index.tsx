import { LineComponent } from '../../../../components/LineComponent'
import { SectionContainer } from '../../../../templates/SectionContainer'
import styled from 'styled-components'

export function Instructions() {
  return (
    <SectionContainer hasHeader>
      <InstructionsTitle>Instruções Gerais</InstructionsTitle>
      <LineComponent />
      <InstructionsParagraph>
        Este checklist tem como objetivo avaliar a adequação de dispositivos IoT
        da área da saúde com restrições de processamento, memória e energia.
        <br />
        <br />
        Para fins de avaliação, os dispositivos foram organizados nas seguintes
        categorias:
        <br />
        <br />
        <strong>Sensores</strong>: dispositivos responsáveis pela coleta e
        transmissão de sinais biomédicos e fisiológicos, como sensores ECG,
        sensores WBAN e sensores de sinais vitais.
        <br />
        <br />
        <strong>Wearables</strong>: dispositivos vestíveis utilizados para
        monitoramento contínuo e acompanhamento da saúde do usuário.
        <br />
        <br />
        <strong>Dispositivos Implantáveis (IMD)</strong>: dispositivos médicos
        implantados no corpo humano, utilizados para monitoramento ou suporte
        terapêutico com comunicação sem fio.
        <br />
        <br />
        Para preencher o checklist, o avaliador deverá ler cada item e indicar,
        na coluna “Resposta”, uma das seguintes opções:
        <br />
        <br />
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>1 – Sim</strong>: item adequado, em conformidade;{' '}
          </li>
          <li>
            <strong>2 – Não</strong>: item inadequado ou com defeito;{' '}
          </li>
          <li>
            <strong>3 – Não se aplica</strong>: item que não corresponde ao tipo
            de dispositivo avaliado ou ao tratamento de dados realizado.
          </li>
        </ul>{' '}
        <br />
        <br />
        Para os itens classificados como “Não”, o avaliador deverá preencher a
        coluna “Grau de Severidade”, indicando o impacto do problema
        identificado:
        <br />
        <br />
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>1 – Leve</strong>
          </li>
          <li>
            <strong>2 – Grave</strong>
          </li>
          <li>
            <strong>3 – Catastrófico</strong>
          </li>
        </ul>{' '}
        <br />
        <br />
        Na coluna “Comentário do Avaliador”, poderão ser registradas observações
        adicionais, como dúvidas, justificativas, problemas encontrados ou
        detalhes sobre a avaliação realizada.
        <br />
        <br />
        Por fim, a coluna “Recomendações” poderá ser utilizada para registrar
        sugestões de correção, melhoria ou adequação do item avaliado.
      </InstructionsParagraph>
      <LineComponent />
    </SectionContainer>
  )
}

const InstructionsTitle = styled.h2`
  padding: 8px 0;
  font-weight: 500;
`

const InstructionsParagraph = styled.p`
  padding: 12px 0;
`
