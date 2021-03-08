import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Style = styled.div`
  position: relative;
`

const MenuContainer = styled.div`
  position: absolute;
  margin-top: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  
  &:hover {
    color: white;
  }
`
const itemCss = css`
  padding: 10px 15px;
  background: var(--primary-2);
  
  &:first-child {
    border-radius: var(--border-radius) var(--border-radius) 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px var(--border-radius) var(--border-radius);
  }
  &:hover {
    background: var(--primary-3);
  }
`

const Item = styled.div`
  ${itemCss}
`

const LinkItem = styled(Link)`
  display: block;

  ${itemCss}
`

const Element = styled.div`
  color: white;
  cursor: pointer;

  &:hover {
    color: lightgray;
  }
`

const Menu = props => {
  const menuRef = useRef();
  const [open, setOpen] = useState(false);

  const element = React.cloneElement(props.element, { onClick: () => setOpen(o => !o)});

  useEffect(() => {
    const onClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target) && open)
        setOpen(false);
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <Style ref={menuRef}>
      <Element>
        {element}
      </Element>
      {
        open ? (
          <MenuContainer onClick={() => setOpen(false)}>
            {props.children}
          </MenuContainer>
        ) : null
      }
    </Style>
  )
}

export const MenuItem = props => {
  const Component = props.to ? LinkItem : Item;

  return (
    <Component {...props}>{props.children}</Component>
  )
}

export default Menu;