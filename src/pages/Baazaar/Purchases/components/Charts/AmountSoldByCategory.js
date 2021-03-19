import Chart from "components/Chart/Chart";
import { useMemo } from "react";
import { groupByDay } from "utils/array";
import { LISTING_CATEGORY } from "utils/constants";
import formatter from "utils/formatter";

const AmountSoldByCategory = ({ purchases }) => {
  const config = {
    yAxis: [
      { formatter: formatter.number }
    ],
    series: [
      { name: 'Aavegotchis', seriesType: 'area', stackId: "1", dataKey: 'aavegotchis', formatter: formatter.number },
      { name: 'Open Portals', seriesType: 'area', stackId: "1", dataKey: 'openPortals', formatter: formatter.number },
      { name: 'Closed Portals', seriesType: 'area', stackId: "1", dataKey: 'closedPortals', formatter: formatter.number },
    ],
  }

  const data = useMemo(() => {
    if (!purchases) return;
    
    const groups =  groupByDay(purchases, group => group.length);
    return groups.map(group => ({
      date: group.date,
      aavegotchis: group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.aavegotchi).length,
      openPortals: group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.openPortal).length,
      closedPortals: group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.portal).length
    }))
  }, [purchases]);

  return <Chart title={`Amount sold by category`} config={config} data={data} />
}

export default AmountSoldByCategory;