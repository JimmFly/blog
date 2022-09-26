import Page from "../components/Layout";
// import { MarkdownPage } from "components/Layout/MarkdownPage";
// import { MDXComponents } from "components/MDX/MDXComponents";

export default function NotFound() {
  return (
    <Page>
      <p>This page doesn’t exist.404</p>
      <p>
        Quite possibly, it hasn’t been written yet. This beta is a{" "}
        <a>work in progress!</a>
      </p>
      <p>Please check back later.</p>
    </Page>
  );
}
