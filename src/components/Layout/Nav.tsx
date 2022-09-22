import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useActiveSection } from "../../hooks/useActiveSection";
import { SidebarContext } from "./useRouteMeta";
import { SidebarRouteTree } from "./Sidebar/SidebarRouteTree";
import type { RouteItem } from "./useRouteMeta";
import sidebarHome from "../../sidebarHome.json";
import sidebarLearn from "../../sidebarLearn.json";
import sidebarReference from "../../sidebarReference.json";

declare global {
  interface Window {
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
  }
}

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const scrollParentRef = React.useRef<HTMLDivElement>(null);
  const section = useActiveSection();
  const { asPath } = useRouter();

  // In desktop mode, use the route tree for current route.
  let routeTree: RouteItem = React.useContext(SidebarContext);
  // In mobile mode, let the user switch tabs there and back without navigating.
  // Seed the tab state from the router, but keep it independent.
  const [tab, setTab] = React.useState(section);
  const [prevSection, setPrevSection] = React.useState(section);
  if (prevSection !== section) {
    setPrevSection(section);
    setTab(section);
  }
  if (isOpen) {
    switch (tab) {
      case "home":
        routeTree = sidebarHome as RouteItem;
        break;
      case "learn":
        routeTree = sidebarLearn as RouteItem;
        break;
      case "apis":
        routeTree = sidebarReference as RouteItem;
        break;
    }
  }
  // HACK. Fix up the data structures instead.
  if ((routeTree as any).routes.length === 1) {
    routeTree = (routeTree as any).routes[0];
  }

  // While the overlay is open, disable body scroll.
  React.useEffect(() => {
    if (isOpen) {
      const preferredScrollParent = scrollParentRef.current!;
      disableBodyScroll(preferredScrollParent);
      return () => enableBodyScroll(preferredScrollParent);
    } else {
      return undefined;
    }
  }, [isOpen]);

  // Close the overlay on any navigation.
  React.useEffect(() => {
    setIsOpen(false);
  }, [asPath]);

  // Also close the overlay if the window gets resized past mobile layout.
  // (This is also important because we don't want to keep the body locked!)
  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: 1023px)`);
    function closeIfNeeded() {
      if (!media.matches) {
        setIsOpen(false);
      }
    }
    closeIfNeeded();
    media.addEventListener("change", closeIfNeeded);
    return () => {
      media.removeEventListener("change", closeIfNeeded);
    };
  }, []);

  function selectTab(nextTab: "learn" | "apis" | "home") {
    setTab(nextTab);
    scrollParentRef.current!.scrollTop = 0;
  }

  return (
    <div>
      <nav className="items-center w-full flex lg:block justify-between bg-wash dark:bg-wash-dark pt-0 lg:pt-4 pr-5 lg:px-5 z-50">
        <div className="xl:w-full xl:max-w-xs flex items-center">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setIsOpen(!isOpen)}
          ></button>
          <NextLink href="/">
            <a className="inline-flex text-l font-normal items-center text-primary dark:text-primary-dark py-1 mr-0 sm:mr-3 whitespace-nowrap">
              React Docs
            </a>
          </NextLink>
          <div className="lg:w-full leading-loose hidden sm:flex flex-initial items-center h-auto pr-5 lg:pr-5 pt-0.5">
            <div className="px-1 mb-px bg-highlight dark:bg-highlight-dark rounded text-link dark:text-link-dark uppercase font-bold tracking-wide text-xs whitespace-nowrap">
              Beta
            </div>
          </div>
          <div className="block dark:hidden">
            <button
              type="button"
              aria-label="Use Dark Mode"
              onClick={() => {
                window.__setPreferredTheme("dark");
              }}
              className="hidden lg:flex items-center h-full pr-2"
            ></button>
          </div>
          <div className="hidden dark:block">
            <button
              type="button"
              aria-label="Use Light Mode"
              onClick={() => {
                window.__setPreferredTheme("light");
              }}
              className="hidden lg:flex items-center h-full pr-2"
            ></button>
          </div>
        </div>
        <div className="px-0 pt-2 w-full 2xl:max-w-xs hidden lg:flex items-center self-center border-b-0 lg:border-b border-border dark:border-border-dark">
          <NextLink href="/">Home</NextLink>
          <NextLink href="/learn">Learn</NextLink>
          <NextLink href="/apis/react">API</NextLink>
        </div>
        <div className="flex my-4 h-10 mx-0 w-full lg:hidden justify-end lg:max-w-sm">
          {/* <Search /> */}
        </div>
      </nav>

      {isOpen && (
        <div className="bg-wash dark:bg-wash-dark px-5 flex justify-end border-b border-border dark:border-border-dark items-center self-center w-full z-10">
          <TabButton
            isActive={tab === "home"}
            onClick={() => selectTab("home")}
          >
            Home
          </TabButton>
          <TabButton
            isActive={tab === "learn"}
            onClick={() => selectTab("learn")}
          >
            Learn
          </TabButton>
          <TabButton
            isActive={tab === "apis"}
            onClick={() => selectTab("apis")}
          >
            API
          </TabButton>
        </div>
      )}

      <div
        ref={scrollParentRef}
        className="overflow-y-scroll no-bg-scrollbar lg:w-[336px] grow bg-wash dark:bg-wash-dark"
      >
        <aside>
          {!isOpen && <div className="px-5 sm:pt-10 lg:pt-4"></div>}
          <nav
            role="navigation"
            style={{ "--bg-opacity": ".2" } as React.CSSProperties} // Need to cast here because CSS vars aren't considered valid in TS types (cuz they could be anything)
            className="w-full lg:h-auto grow pr-0 lg:pr-5 pt-6 lg:py-6 md:pt-4 lg:pt-4 scrolling-touch scrolling-gpu"
          >
            {/* No fallback UI so need to be careful not to suspend directly inside. */}
            <React.Suspense fallback={null}>
              <SidebarRouteTree
                // Don't share state between the desktop and mobile versions.
                // This avoids unnecessary animations and visual flicker.
                key={isOpen ? "mobile-overlay" : "desktop-or-hidden"}
                routeTree={routeTree}
                isForceExpanded={isOpen}
              />
            </React.Suspense>
            <div className="h-20" />
          </nav>
          <div className="fixed bottom-0 hidden lg:block"></div>
        </aside>
      </div>
    </div>
  );
}

function TabButton({
  children,
  onClick,
  isActive,
}: {
  children: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive: boolean;
}) {
  return <button onClick={onClick}>{children}</button>;
}
