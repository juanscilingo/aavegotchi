import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import Loader from "components/UI/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LISTING_CATEGORY_NAME } from "utils/constants";
import { diamondContract } from "utils/contracts";
import formatter from "utils/formatter";
import { TOKENS } from "utils/tokens";
import web3 from "utils/web3";

const Style = styled.div`

`

const Highlights = styled.div`
  margin-bottom: 30px;
`

const Grid = styled.div`
  height: 769px;
`

const EARLIEST_BLOCK = 11516320;
const BLOCKS_PER_REQUEST = 50000;
const POLLING_INTERVAL = 1000 * 10; 

const defaultColDef = {
  sortable: true,
  filter: true
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

const Purchases = props => {
  const [purchases, setPurchases] = useState();
  const [highlights, setHighlights] = useState();
  const latestBlock = useRef();

  // const computeHighlights = data => {
  //   const highestPrice = data.reduce((prev, current) => (prev.priceInWei > current.priceInWei) ? prev : current)
  // }

  useEffect(() => {
    const getPastEvents = async () => {
      const currentBlock = await web3.eth.getBlockNumber();
      const requests = buildRequests(currentBlock, latestBlock.current);

      if (!latestBlock.current) {
        const first = await requests.shift();
        // console.log(first)
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
    if (!!latestBlock.current) {
      setHighlights([])
    }
  }, [purchases])

  if (!purchases)
    return null;

  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
  }

  // const onFilterChanged = ({ api }) => {
  //   const filteredRows = api.rowModel.rowsToDisplay.map(row => row.data);
  //   console.log('filter changed...', filteredRows)
  // }

  return (
    <Style>
      {highlights ? (
        <Highlights>
          {/* <div>Highlights!</div> */}
        </Highlights>
      ) : (
        <Loader />
      )}
      <Grid className="ag-theme-alpine">
        <AgGridReact 
          rowData={purchases} 
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          pagination 
          paginationAutoPageSize 
          enableCellTextSelection
          // onFilterChanged={onFilterChanged}
        >
          <AgGridColumn field="time" sort="desc" headerName="Date" valueFormatter={({ value }) => new Date(value * 1000).toLocaleString()}></AgGridColumn>
          <AgGridColumn field="category" valueFormatter={({ value }) => LISTING_CATEGORY_NAME[value]}></AgGridColumn>
          <AgGridColumn field="listingId" cellRenderer={({ value }) => `<a href="https://aavegotchi.com/baazaar/erc721/${value}" target="_blank" rel="noopener noreferrer">${value}</a>`} comparator={(a, b) => a - b}></AgGridColumn>
          <AgGridColumn field="erc721TokenId" headerName="Token Id" comparator={(a, b) => a - b}></AgGridColumn>
          <AgGridColumn field="seller" cellRenderer={({ value }) => `<a href="https://explorer-mainnet.maticvigil.com/address/${value}" target="_blank" rel="noopener noreferrer">${formatter.trimmedAddress(value)}</a>`}></AgGridColumn>
          <AgGridColumn field="buyer" cellRenderer={({ value }) => `<a href="https://explorer-mainnet.maticvigil.com/address/${value}" target="_blank" rel="noopener noreferrer">${formatter.trimmedAddress(value)}</a>`}></AgGridColumn>
          <AgGridColumn field="priceInWei" headerName="Price" valueFormatter={({ value }) => formatter.token(value, TOKENS.GHST)} comparator={(a, b) => a - b}></AgGridColumn>
        </AgGridReact>
      </Grid>
    </Style>
  )
}

export default Purchases;