import styled, { css } from "styled-components";

const container = css`
  padding: 15px;
  background: var(--primary-2);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  margin-right: 15px;
  margin-bottom: 15px;
`

const Container = styled.div`
  ${container}
`

const TitleContainer = styled.div`
  margin-bottom: 10px;
  min-height: 32px;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
`

const Subtitle = styled.div`
  font-size: 12px;
  color: lightgray;
`

const Value = styled.div`
  font-weight: 600;
  font-size: 14px;
`

const LinkContainer = styled.a`
  ${container}
`

const Highlight = props => {
  const Wrapper = props.href ? LinkContainer : Container; 
  return (
    <Wrapper href={props.href} target="_blank" rel="noopener noreferrer">
      <TitleContainer>
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
      </TitleContainer>
      <Value>{props.value}</Value>
    </Wrapper>
  )
}

export default Highlight;