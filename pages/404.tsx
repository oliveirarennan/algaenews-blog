import Image from "next/image" 
import Link from "next/link" 
import styled from "styled-components"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../_constants"
import NotFountImage from "../public/not_found.svg"

export default function NotFound(){
  return (
    <Wrapper>
      <Image 
        src={NotFountImage} 
        width={200} height={200} 
        objectFit="contain"
        alt="Imagem não encontrado"/>
      <h1>Página não encontrada</h1>
      <Link href="/" passHref>
        <BackToHome>
          Voltar para Home
        </BackToHome>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
  gap: 24px;
`

const BackToHome = styled.a`
  color: ${p => p.theme.primaryBackground};
  text-decoration: none;
`