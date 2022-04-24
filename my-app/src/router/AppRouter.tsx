import { useRoutes } from "raviger";
import React, { Suspense } from "react";
import AppContainer from "../AppContainer";
import { User } from "../types/userTypes";

const Home = React.lazy(() => import("../components/Home"));
const About = React.lazy(() => import("../components/About"));
const Login = React.lazy(() => import("../components/Login"));
const PreviewForm = React.lazy(() => import("../components/PreviewForm"));
const FormsList = React.lazy(() => import("../components/FormsList"));
const EditForm = React.lazy(() => import("../components/EditForm"));

const loadingFallback = <div>Loading...</div>;

const routes = {
  "/": () => (
    <Suspense fallback={loadingFallback}>
      <Home />
    </Suspense>
  ),
  "/login": () => (
    <Suspense fallback={loadingFallback}>
      <Login />
    </Suspense>
  ),
  "/about": () => (
    <Suspense fallback={loadingFallback}>
      <About />
    </Suspense>
  ),
  "/forms": () => (
    <Suspense fallback={loadingFallback}>
      <FormsList />
    </Suspense>
  ),
  "/forms/:id": ({ id }: { id: string }) => (
    <Suspense fallback={loadingFallback}>
      <EditForm formId={Number(id)} />
    </Suspense>
  ),
  "/preview/:id": ({ id }: { id: string }) => (
    <Suspense fallback={loadingFallback}>
      <PreviewForm formId={Number(id)} />
    </Suspense>
  ),
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
