import { GetServerSideProps } from "next"
import Head from "next/head"
import { Post, PostService } from "oliveirarennan-alganews-sdk"
import ResourceNotFoundError from "oliveirarennan-alganews-sdk/dist/errors/ResourceNotFound.error"
import { ParsedUrlQuery } from "querystring"
import Markdown from "../../../components/Markdown"
import PostHeader from "../../../components/PostHeader"
import { DiscussionEmbed } from 'disqus-react';

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
  host?: string;
}

export default function PostPage(props: PostProps) {

  return (
    <>
      <Head>
        <meta property="og:title" content={props.post?.title} />
        <meta property="og:site_name" content="AlgaNews" />
        <meta property="og:url" content="alganews.com.br" />
        <meta property="og:description" content={props?.post?.body.slice(0, 54)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={props.post?.imageUrls.medium} />
        <link rel="canonical" href={`http://${props.host}/${props.post?.id}/${props.post?.slug}`} />
        ,<title>{props.post?.title} | alganews</title>
      </Head>
      {
        props.post && (
          <>
            <PostHeader
              thumbnail={props.post?.imageUrls.large}
              editor={props.post?.editor}
              createdAt={props.post?.createdAt}
              title={props.post?.title}

            />
            <Markdown>
              {props.post.body}
            </Markdown>
            <DiscussionEmbed
              shortname='alganewsrno'
              config={
                {
                  url: `http://${props.host}/${props.post?.id}/${props.post?.slug}`,
                  identifier: String(props.post.id),
                  title: props.post.title,
                  language: 'pt_BR' //e.g. for Traditional Chinese (Taiwan)	
                }
              }
            />

          </>
        )
      }

    </>
  )
}

interface Params extends ParsedUrlQuery {
  id: string;
  slug: string;

}

export const getServerSideProps: GetServerSideProps<PostProps, Params> = async ({ params, req }) => {
  try {
    if (!params) return { notFound: true }

    const { id, slug } = params
    const postId = Number(id)

    if (isNaN(postId)) return { notFound: true }

    const post = await PostService.getExistingPost(postId);

    return {
      props: {
        post,
        host: req.headers.host
      }
    }

  } catch (error: any) {

    if (error instanceof ResourceNotFoundError) {

    }

    return {
      props: {
        error: {
          message: error.message,
          statusCode: error.data?.status || 500
        }
      }
    }

  }


}