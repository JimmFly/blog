import Layout from "../components/Layout";
import { getAllPostIds, getPostData } from "../utils/posts";
import Head from "next/head";
import Date from "../components/Date";
import utilStyles from "../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  const { locale } = useRouter();
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} locale={locale as string} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = getAllPostIds(locales as string[]);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postData = await getPostData(params!.id as string, locale as string);
  return {
    props: {
      postData,
    },
  };
};
