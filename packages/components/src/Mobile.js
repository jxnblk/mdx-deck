import React from "react";
import Zoom from "@mdx-deck/components/src/Zoom";
import Pre from "@mdx-deck/components/src/Pre";

import styled from '@emotion/styled'

const Button = styled.button(() => ({
  color: "black",
  backgroundColor: "white",
  height:'3rem',
  margin: '0 0.2rem',
}))

export const Mobile = props => {
  const { slides, metadata, index, previous, next } = props;

  return (
    <div
      style={{
        color: "white",
        backgroundColor: "black",
        display: "flex",
        userSelect: "none",
        flexDirection: 'column',
        justifyContent: 'center',
        padding:'1rem',
        height: "100vh"
      }}
    >
          <Button onClick={previous}>Previous</Button>
          <Pre>{index} of {slides.length - 1}</Pre>
          <Zoom zoom={0.75}>{props.children}</Zoom>
          <Button onClick={next}>Next</Button>
    </div>
  );
};

export default Mobile;
