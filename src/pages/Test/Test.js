import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll";
import Loader from "components/UI/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Data = styled.div`
  height: 300px;
  border: 1px solid red;
`

const getNewData = prevData => {
  const newData = [];

  for (let i = prevData.length; i < prevData.length + 20; i++)
    newData.push(i);
  
  return newData;
}

const Test = () => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchData = () => {
    setFetching(true);
    setTimeout(() => {
      setData(prev => [...prev, ...getNewData(prev)]);
      setFetching(false);
    }, 3000)
  }

  return (
    <div>
      <h3>Test Page</h3>
      <InfiniteScroll fetchData={fetchData} fetching={fetching}>
        {data.map(d => (
          <Data>{d}</Data>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Test;