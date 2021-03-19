import React from "react";
import styled from "styled-components";
import emotes from "./emotes";

const Image = styled.img`
  width: 32px;
  height: 32px;
  vertical-align: middle;
`

const Emote = props => {
  const src = emotes[props.alias];

  if (!src)
    return null;

  return (
    <Image {...props} src={src} />
  )
}

export default Emote;