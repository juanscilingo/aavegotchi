import styled from "styled-components";

const { default: Loader } = require("components/UI/Loader/Loader");
const { useState, useEffect } = require("react");
const { diamondContract } = require("utils/contracts");

const Image = styled.iframe`
  border: none;
`

const imageStyle = `
  <style>
    .gotchi-bg {
      display: none;
    }
  </style>
`

const Gotchi = ({ id, className }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const getSvg = async () => {
      const svg = await diamondContract.methods.getAavegotchiSvg(id).call();
      setImage(svg);
    }

    getSvg();
  }, [id]);

  if (!id)
    return null;

  if (!image)
    return <Loader />

  return (
    <Image srcDoc={imageStyle+image} className={className} title="image"></Image>
  )
}

export default Gotchi;