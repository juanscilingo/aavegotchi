import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Input = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 6px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 10px;
  user-select: none;
  font-size: 14px;
  padding-right: ${props => props.noArrow ? '10px' : '30px'};
`

const Options = styled.div`
  position: absolute;
  display: ${props => props.open ? 'block' : 'none'};
  top: 100%;
  left: 0px;
  min-width: 100%;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--primary-3);
  z-index: 10;
`

const Arrow = styled.div`
  position: absolute;
  right: 10px;
  font-size: 10px;
  top: calc(50% - 6px);
  border-left: none !important;
`

const Select = props => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const options = props.children.reduce((options, current) => ({ ...options, [current.props.value]: current.props.children}), {});
  const ClonedOptions = props.children.map((child, i) => React.cloneElement(child, { setValue: props.onChange, key: i }));

  useEffect(() => {
    const onClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target) && open)
        setOpen(false);
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <Input onClick={() => setOpen(p => !p)} noArrow={props.noArrow} ref={ref}>
      {options[props.value]}
      <Options open={open}>
        {ClonedOptions}
      </Options>
      {!props.noArrow && <Arrow>{open ? '▲' : '▼'}</Arrow>}
    </Input>
  )
}

export default Select;