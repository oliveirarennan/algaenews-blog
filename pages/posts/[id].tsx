import { GetServerSideProps } from "next"
import { Post, PostService } from "oliveirarennan-alganews-sdk"
import  ResourceNotFoundError  from "oliveirarennan-alganews-sdk/dist/errors/ResourceNotFound.error"
import { ParsedUrlQuery } from "querystring"

interface PostProps extends NextPageProps{
  post?: Post.Detailed
}

export default function PostPage(props: PostProps) {

  return <div>
    {props.post?.title}
  </div>
}

interface Params extends ParsedUrlQuery {
  id: string;
  
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> = async ({ params }) => {
  try {
    if (!params) return { notFound: true }

    const { id } = params
    const postId = Number(id)

    if (isNaN(postId)) return { notFound: true }

    const post = await PostService.getExistingPost(postId);

    return {
      props: {
        post,
      }
    }

  } catch (error: any) {

    if(error instanceof ResourceNotFoundError) {

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