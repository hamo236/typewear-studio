import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { MobileNav, SiteFooter, SiteHeader } from "./components/SiteShell";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StudioProvider, useStudio } from "./lib/StudioContext";
import About from "./pages/About";
import Cart from "./pages/Cart";
import DesignSystem from "./pages/DesignSystem";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";

const routerBase = import.meta.env.BASE_URL === "/"
  ? ""
  : import.meta.env.BASE_URL.replace(/\/$/, "");

function SiteRoutes() {
  const { dir } = useStudio();
  return <div className="site-frame" dir={dir}>
    <SiteHeader />
    <main className="route-content">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/editor" component={Editor} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
        <Route path="/design-system" component={DesignSystem} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <SiteFooter />
    <MobileNav />
  </div>;
}

export default function App() {
  return <ErrorBoundary>
    <ThemeProvider defaultTheme="light" switchable>
      <StudioProvider>
        <WouterRouter base={routerBase}>
          <SiteRoutes />
        </WouterRouter>
      </StudioProvider>
    </ThemeProvider>
  </ErrorBoundary>;
}
