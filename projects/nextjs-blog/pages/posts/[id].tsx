import Layout from '../../components/layout'
import Date from '../../components/date'
import {getAllPostIds, getPostData, PostWithContent} from '../../lib/posts'
import Head from 'next/head'
import {GetStaticProps, GetStaticPaths, GetStaticPropsContext} from 'next'

import utilStyles from '../../styles/utils.module.css'

type PostProps = {
  postData: PostWithContent
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const postData = await getPostData(context.params!.id as string)
  return {
    props: {
      postData
    }
  }
}
