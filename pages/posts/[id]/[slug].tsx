import { GetServerSideProps } from "next"
import Head from "next/head"
import { Post, PostService } from "oliveirarennan-alganews-sdk"
import ResourceNotFoundError from "oliveirarennan-alganews-sdk/dist/errors/ResourceNotFound.error"
import { ParsedUrlQuery } from "querystring"
import PostHeader from "../../../components/PostHeader"

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
  host?: string;
}

export default function PostPage(props: PostProps) {

  return (
    <>
      <Head>
        <link rel="canonical" href={`http://${props.host}/${props.post?.id}/${props.post?.slug}`} />
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