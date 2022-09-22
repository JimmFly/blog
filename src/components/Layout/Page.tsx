import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/layout.module.css";
import utilStyles from "../../styles/Home.module.css";
import Link from "next/link";
import Nav from "./Nav";

const name = "JimmFly";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Nav />
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
// import * as React from "react";
// import { useRouter } from "next/router";
// import Nav from "./Nav";
// import { RouteItem, SidebarContext } from "./useRouteMeta";
// import { useActiveSection } from "hooks/useActiveSection";
// import Footer from "./Footer";
// import Toc from "./Toc";

// interface PageProps {
//   children: React.ReactNode;
//   toc: Array<TocItem>;
// }

// export function Page({ children, toc }: PageProps) {
//   const { asPath } = useRouter();
//   const section = useActiveSection();
//   let routeTree = sidebarHome as RouteItem;
//   switch (section) {
//     case "apis":
//       routeTree = sidebarReference as RouteItem;
//       break;
//     case "learn":
//       routeTree = sidebarLearn as RouteItem;
//       break;
//   }
//   return (
//     <>
//       <SidebarContext.Provider value={routeTree}>
//         <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
//           <div className="fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none z-50">
//             <Nav />
//           </div>
//           {/* No fallback UI so need to be careful not to suspend directly inside. */}
//           <React.Suspense fallback={null}>
//             <main className="min-w-0">
//               <div className="lg:hidden h-16 mb-2" />
//               <article className="break-words" key={asPath}>
//                 {children}
//               </article>
//               <Footer />
//             </main>
//           </React.Suspense>
//           <div className="hidden lg:max-w-xs 2xl:block">
//             {toc.length > 0 && <Toc headings={toc} key={asPath} />}
//           </div>
//         </div>
//       </SidebarContext.Provider>
//     </>
//   );
// }
