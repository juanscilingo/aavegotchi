import Loader from "components/UI/Loader/Loader";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Style = styled.div`

`

const InfiniteScroll = ({ fetchData, fetching, children, hasMore, style }) => {
  const trigger = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    let previousY;
    let previousRatio = 0;

    const handleIntersection = entries => {
      if (fetching || !hasMore)
        return false;

      entries.forEach(entry => {
        const { y } = entry.boundingClientRect;
        if (entry.isIntersecting && entry.intersectionRatio >= previousRatio && (!previousY || y < previousY)) {
          fetchData()
        }

        previousY = y;
        previousRatio = entry.intersectionRatio;
      })
    }

    const observer = new IntersectionObserver(handleIntersection, options);

    if (trigger.current) {
      const observedElement = trigger.current;
      observer.observe(observedElement)
      return () => {
        observer.unobserve(observedElement)
      }
    }
  }, [fetchData, fetching, hasMore]);
  
  return (
    <Style style={style}>
      {children}
      {hasMore && <Loader ref={trigger} />}
    </Style>
  )
}

export default InfiniteScroll;