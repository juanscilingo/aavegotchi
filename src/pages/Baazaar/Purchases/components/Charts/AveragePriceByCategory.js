import Chart from "components/Chart/Chart";
import { useMemo } from "react";
import { groupByDay } from "utils/array";
import { LISTING_CATEGORY } from "utils/constants";
import formatter from "utils/formatter";
import { AGGREGATION_FN, convertFromWeiToTokenDecimals } from "utils/numbers";
import { TOKENS } from "utils/tokens";

const AveragePriceByCategory = ({ purchases }) => {
  const config = {
    yAxis: [
      { formatter: v => formatter.symbol(v, TOKENS.GHST.symbol) }
    ],
    series: [
      { name: 'Aavegotchis', seriesType: 'line', dataKey: 'aavegotchis', formatter: v => formatter.symbol(v, TOKENS.GHST.symbol) },
      { name: 'Open Portals', seriesType: 'line', dataKey: 'openPortals', formatter: v => formatter.symbol(v, TOKENS.GHST.symbol) },
      { name: 'Closed Portals', seriesType: 'line', dataKey: 'closedPortals', formatter: v => formatter.symbol(v, TOKENS.GHST.symbol) },
    ],
  }

  const data = useMemo(() => {
    if (!purchases) return;

    const groups = groupByDay(purchases);
    return groups.map(group => ({
      date: group.date,
      aavegotchis: AGGREGATION_FN.avg(group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.aavegotchi), d => convertFromWeiToTokenDecimals(d.priceInWei, TOKENS.GHST)),
      openPortals: AGGREGATION_FN.avg(group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.openPortal), d => convertFromWeiToTokenDecimals(d.priceInWei, TOKENS.GHST)),
      closedPortals: AGGREGATION_FN.avg(group.values.filter(g => parseInt(g.category) === LISTING_CATEGORY.portal), d => convertFromWeiToTokenDecimals(d.priceInWei, TOKENS.GHST))
    }))
  }, [purchases]);

  return <Chart title="Average selling price" config={config} data={data} />
}

export default AveragePriceByCategory;