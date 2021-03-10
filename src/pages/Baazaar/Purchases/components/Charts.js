import styled from "styled-components";
import AmountSoldByCategory from "./Charts/AmountSoldByCategory";
import AveragePriceByCategory from "./Charts/AveragePriceByCategory";

const Style = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ChartContainer = styled.div`
  height: 400px;
  background: var(--primary-2);
  width: calc(100% / 2 - 20px);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;

  @media(max-width: 768px) {
    width: 100%;
  }
`

const Charts = props => {
  return (
    <Style>
      <ChartContainer>
        <AveragePriceByCategory purchases={props.purchases} />
      </ChartContainer>
      <ChartContainer>
        <AmountSoldByCategory purchases={props.purchases} />
      </ChartContainer>
    </Style>
  )
}

export default Charts;