import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import BigNumber from "bignumber.js";
import Loader from "components/UI/Loader/Loader";
// import { sub } from "date-fns";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LISTING_CATEGORY, LISTING_CATEGORY_NAME } from "utils/constants";
import { diamondContract } from "utils/contracts";
import formatter from "utils/formatter";
import { TOKENS } from "utils/tokens";
import web3 from "utils/web3";
import Charts from "./components/Charts";
import Highlight from "./components/Highlight";

const Style = styled.div`

`

const Highlights = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  min-height: 104px;
`

const Grid = styled.div`
  height: 769px;
  margin-bottom: 30px;
`

const EARLIEST_BLOCK = 11516320;
const BLOCKS_PER_REQUEST = 50000;
const POLLING_INTERVAL = 1000 * 10; 

const defaultColDef = {
  sortable: true,
  filter: true,
  minWidth: 180
}

const buildRequests = (latestBlock, sinceBlock) => {
  const requests = [];
  const earliestBlock = sinceBlock ?? EARLIEST_BLOCK;
  let toBlock = latestBlock;

  while (toBlock >= earliestBlock) {
    let fromBlock = toBlock - BLOCKS_PER_REQUEST;
    if (fromBlock < earliestBlock) fromBlock = earliestBlock;
    requests.push(diamondContract.getPastEvents('ERC721ExecutedListing', { fromBlock, toBlock }));
    toBlock = fromBlock - 1;
  }

  return requests;
}

const mapEvent = event => event.returnValues;

const getHighestPricePurchase = data => data.length ? data.reduce((prev, current) => (new BigNumber(prev.priceInWei).isGreaterThan(new BigNumber(current.priceInWei))) ? prev : current) : null;
const getLowestPricePurchase = data => data.length ? data.reduce((prev, current) => (new BigNumber(prev.priceInWei).isLessThan(new BigNumber(current.priceInWei))) ? prev : current) : null;
const getAveragePurchasePrice = (data, category) => {
  const filteredData = data.filter(d => d.category === category.toString());

  if (!filteredData.length)
    return;

  const totalSpent = filteredData.reduce((acc, purchase) => acc.plus(new BigNumber(purchase.priceInWei)), new BigNumber(0));
  return totalSpent.dividedBy(filteredData.length);
}

const Purchases = props => {
  const [purchases, setPurchases] = useState();
  const [filteredPurchases, setFilteredPurchases] = useState();
  const [highlights, setHighlights] = useState();
  const latestBlock = useRef();

  const computeHighlights = data => {
    const highlights = [];

    // ALL TIME
    const highestPricePurchase = getHighestPricePurchase(data);
    if (highestPricePurchase) highlights.push({ key: 'highest-price-purchase', title: 'Highest Paid', subtitle: LISTING_CATEGORY_NAME[highestPricePurchase.category], value: formatter.token(highestPricePurchase.priceInWei, TOKENS.GHST), href: `https://aavegotchi.com/baazaar/erc721/${highestPricePurchase.listingId}` });
    
    const lowestPricePurchase = getLowestPricePurchase(data);
    if (lowestPricePurchase) highlights.push({ key: 'lowest-price-purchase', title: 'Lowest Paid', subtitle: LISTING_CATEGORY_NAME[lowestPricePurchase.category], value: formatter.token(lowestPricePurchase.priceInWei, TOKENS.GHST), href: `https://aavegotchi.com/baazaar/erc721/${lowestPricePurchase.listingId}` });
    
    const averageClosedPortalPurchasePrice = getAveragePurchasePrice(data, LISTING_CATEGORY.portal);
    if (averageClosedPortalPurchasePrice) highlights.push({ key: 'average-closed-portal-purchase-price', title: 'Avg. Purchase Price', subtitle: 'Closed Portal', value: formatter.token(averageClosedPortalPurchasePrice.toString(), TOKENS.GHST) });

    const averageOpenPortalPurchasePrice = getAveragePurchasePrice(data, LISTING_CATEGORY.openPortal);
    if (averageOpenPortalPurchasePrice) highlights.push({ key: 'average-open-portal-purchase-price', title: 'Avg. Purchase Price', subtitle: 'Open Portal', value: formatter.token(averageOpenPortalPurchasePrice.toString(), TOKENS.GHST) });
    
    const averageAavegotchiPurchasePrice = getAveragePurchasePrice(data, LISTING_CATEGORY.aavegotchi);
    if (averageAavegotchiPurchasePrice) highlights.push({ key: 'average-aavegotchi-purchase-price', title: 'Avg. Purchase Price', subtitle: 'Aavegotchi', value: formatter.token(averageAavegotchiPurchasePrice.toString(), TOKENS.GHST) });

    // LAST 7 DAYS
    // const since = sub(new Date(), { days: 7 });
    // const last7DaysData = data.filter(d => new Date(d.time * 1000) >= since);
    // const highestPricePurchase7Days = getHighestPricePurchase(last7DaysData);
    // const lowestPricePurchase7Days = getLowestPricePurchase(last7DaysData);
    // const averagePurchasePrice7Days = getAveragePurchasePrice(last7DaysData);

    // const highlights = [
      // { key: '7-day-highest-price-purchase', title: '7-Day Highest Price Purchase', value: formatter.token(highestPricePurchase7Days.priceInWei, TOKENS.GHST) },
      // { key: '7-day-lowest-price-purchase', title: '7-Day Lowest Price Purchase', value: formatter.token(lowestPricePurchase7Days.priceInWei, TOKENS.GHST) },
      // { key: '7-day-average-purchase-price', title: '7-Day Average Purchase Price', value: formatter.token(averagePurchasePrice7Days.toString(), TOKENS.GHST) },
    // ];

    setHighlights(highlights);
  }

  useEffect(() => {
    const getPastEvents = async () => {
      const currentBlock = await web3.eth.getBlockNumber();
      const requests = buildRequests(currentBlock, latestBlock.current ? latestBlock.current + 1 : undefined);

      if (!latestBlock.current) {
        const first = await requests.shift();
        const sortedEvents = first.map(mapEvent);
        setPurchases(sortedEvents)
      }

      const pastEvents = (await Promise.all(requests)).flat().map(mapEvent);
      latestBlock.current = currentBlock;
      setPurchases(prevEvents => [...pastEvents, ...(prevEvents ?? [])]);
    }

    getPastEvents();
    const interval = setInterval(getPastEvents, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!!latestBlock.current && !highlights) {
      computeHighlights(purchases);
      setFilteredPurchases(purchases);
    }
  }, [purchases, highlights])

  if (!purchases)
    return null;

  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
  }

  const onFilterChanged = ({ api }) => {
    const filteredRows = api.rowModel.rowsToDisplay.map(row => row.data);
    computeHighlights(filteredRows);
    setFilteredPurchases(filteredRows);
  }

  return (
    <Style>
      <Highlights>
        {highlights ? (
          highlights.map(highlight => (
            <Highlight {...highlight} />
          ))
        ) : (
          <Loader />
        )}
      </Highlights>
      <Grid className="ag-theme-alpine">
        <AgGridReact 
          rowData={purchases} 
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          pagination 
          paginationAutoPageSize 
          enableCellTextSelection
          onFilterChanged={onFilterChanged}
        >
          <AgGridColumn field="time" sort="desc" headerName="Date" valueFormatter={({ value }) => new Date(value * 1000).toLocaleString()}></AgGridColumn>
          <AgGridColumn field="category" filterValueGetter={({ data }) => LISTING_CATEGORY_NAME[data.category]} valueFormatter={({ value }) => LISTING_CATEGORY_NAME[value]}></AgGridColumn>
          <AgGridColumn field="listingId" cellRenderer={({ value }) => `<a href="https://aavegotchi.com/baazaar/erc721/${value}" target="_blank" rel="noopener noreferrer">${value}</a>`} comparator={(a, b) => a - b}></AgGridColumn>
          <AgGridColumn field="erc721TokenId" headerName="Token Id" comparator={(a, b) => a - b}></AgGridColumn>
          <AgGridColumn field="seller" cellRenderer={({ value }) => `<a href="https://explorer-mainnet.maticvigil.com/address/${value}" target="_blank" rel="noopener noreferrer">${formatter.trimmedAddress(value)}</a>`}></AgGridColumn>
          <AgGridColumn field="buyer" cellRenderer={({ value }) => `<a href="https://explorer-mainnet.maticvigil.com/address/${value}" target="_blank" rel="noopener noreferrer">${formatter.trimmedAddress(value)}</a>`}></AgGridColumn>
          <AgGridColumn field="priceInWei" headerName="Price" valueFormatter={({ value }) => formatter.token(value, TOKENS.GHST)} comparator={(a, b) => a - b}></AgGridColumn>
        </AgGridReact>
      </Grid>
      <Charts purchases={filteredPurchases} />
    </Style>
  )
}

export default Purchases;