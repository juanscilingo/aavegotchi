import { Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import formatter from "utils/formatter";
import CustomTooltip from './Tooltip';

const SERIES_TYPE = {
  line: Line,
  area: Area
}

const SERIES_COLORS = ['#2ecc71', '#f1c40f', '#3498db'];

const Style = styled.div`
  height: 100%;
  padding-bottom: 15px;
  margin-bottom: 15px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0px 20px;
  border-bottom: 1px solid var(--primary-3);
  margin-bottom: 10px;
`

const Title = styled.div`

`

const ChartContainer = styled.div`
  height: calc(100% - 60px);
  padding: 0px 20px;
`

const renderSeries = (serie, i) => {
  const Component = SERIES_TYPE[serie.seriesType];
  return <Component key={serie.name} {...serie} stroke={SERIES_COLORS[i]} fill={SERIES_COLORS[i]} fillOpacity={0.2} strokeWidth={2} />
}

const Chart = props => {
  const { xAxis, yAxis, series, chart, tooltip } = props.config;
  const { title, data } = props;

  return (
    <Style>
      <Header>
        <Title>{title}</Title>
      </Header>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} {...chart} margin={{ top: 30, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="10 10" stroke="var(--primary-3)" />
            {xAxis ? (
              xAxis.map((x, i) => <XAxis {...x} key={`xAxis-${i}`} stroke="white" tickFormatter={x.formatter} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={15} />)
            ) : (
              <XAxis dataKey="date" stroke="white" tickFormatter={formatter.date} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={15} />
            )}
            {yAxis.map((y, i) => <YAxis {...y} key={`yAxis-${i}`} stroke="white" tickFormatter={y.formatter} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dx={-10} width={90} />)}
            <Tooltip content={<CustomTooltip {...tooltip} />} cursor={false} />
            {series.map(renderSeries)}
            <Legend wrapperStyle={{ bottom: '0px', fontSize: 12, fontWeight: '500' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Style>
  )
}

export default Chart;