import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";
import styled from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../_constants";

interface ContentProps {
  children: ReactNode
}

export default function Content(props: ContentProps){
  return <Wrapper>{props.children}</Wrapper>
}

const Wrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`