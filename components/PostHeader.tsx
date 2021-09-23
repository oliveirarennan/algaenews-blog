import Image from "next/image";
import {Post} from "oliveirarennan-alganews-sdk"
import { transparentize } from "polished";
import styled from "styled-components"
import formatPostDate from "../core/utils/formatPostDate";

interface PostHeaderProps{
  thumbnail: string;
  createdAt: string;
  editor: Post.Detailed["editor"];
  title: string;
}

export default function PostHeader(props: PostHeaderProps){
  return (
    <Wrapper>
      <Thumbnail bg={props.thumbnail} />
      <Editor>
        <Image 
          src={props.editor.avatarUrls.small}
          width={64}
          height={64}
          alt={`${props.editor.name} avatar`}
        />

      </Editor>

      <PublishDate>{formatPostDate(props.createdAt)}</PublishDate>

      <Title>{props.title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 256px;
  gap: 16px;
  text-align: center;
`
const Thumbnail = styled.div<{bg: string}>`
  width: 100%;
  height: 256px;
  background-image: url(${p => p.bg});
  background-position: center;
  background-size: cover;
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};
  overflow: hidden;

  
`

const Editor = styled.div`
  margin-top: -48px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px ${p => p.theme.pageBackground};
  img {
    border-radius: 50%;
  }

`

const PublishDate = styled.p`
  color: ${p => transparentize(0.5, p.theme.pageForeground)};
  font-size: 12px;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  `