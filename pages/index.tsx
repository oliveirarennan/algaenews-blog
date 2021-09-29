import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import FeaturedPost from '../components/FeaturedPost'
import { Post, PostService } from 'oliveirarennan-alganews-sdk'
import { ServerResponse } from "http"
import PostCard from '../components/PostCard'
import PostsGrid from '../components/PostsGrid'
import PageGrid from '../components/PageGrid'
import ReactPaginate from 'react-paginate'
import Router from "next/router"

interface HomeProps {
  posts?: Post.Paginated
}

export default function Home(props: HomeProps) {

  const { posts } = props
  return (
    <PageGrid>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        posts?.content?.length && <FeaturedPost postSummary={posts?.content[0]} />
      }

      <PostsGrid>
        {
          posts?.content?.slice(1).map(post => {
            return <PostCard key={post.id} post={post} />
          })
        }
      </PostsGrid>

      <ReactPaginate 
        containerClassName={'Pagination'}
        pageCount={posts?.totalPages || 0}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        previousLabel="<"
        nextLabel=">"
        hrefBuilder={page => `/?page=${page}`}
        onPageChange={page => Router.push(`/?page=${page.selected + 1}`)}

       />




    </PageGrid>
  )
}

function sendToHomePage(res: ServerResponse) {
  res.statusCode = 302
  res.setHeader('Location', '/?page=1')
  return {
    props: {}
  }
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query, res }) => {
  const { page: _page } = query

  const page = _page ? Number(_page) : 1

  if (isNaN(page) || page < 1) {
    return sendToHomePage(res)
  }

  const posts = await PostService.getAllPosts({ page })

  if (!posts.content?.length) {
    return sendToHomePage(res)
  }
  return {
    props: {
      posts
    }
  }
}

