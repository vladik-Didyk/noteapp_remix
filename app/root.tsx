import MainNavigation from "~/components/MainNavigation";
import styles from "~/styles/main.css";
import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: "Home Page" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// There is an option to add Error Boundary at any routes. When it here, it will show an error that occurred at any part of project.
export function ErrorBoundary() {
  // if (!error) return null; // If there's no error, don't render anything
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <title>An error occurred! from root</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className="error">
            <h1>An error occurred! from root 2</h1>
            <p>{error.message}</p>
            <p>
              Back to <Link to="/">safety</Link>!
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
