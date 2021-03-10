import Badge from "components/UI/Badge/Badge";
import styled from "styled-components";

const Style = styled.div`
  max-width: 250px;
  background: var(--primary);
  font-size: 14px;
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`

const Label = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`

const Value = styled.div`
  font-weight: 500;
`

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Style>
        <Label>{`${label.toLocaleDateString()}`}</Label>
        {payload.map(p => (
          <Value key={p.name}><Badge dot color={p.color} /> {p.name}: {p.formatter(p.value)}</Value>
        ))}
      </Style>
    );
  }

  return null;
}

export default CustomTooltip;