import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import About from "../components/About";
import { EditForm } from "../components/EditForm";
import { FormsList } from "../components/FormsList";
import Home from "../components/Home";
import PreviewForm from "../components/PreviewForm";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms": () => <FormsList />,
  "/forms/:id": ({ id }: { id: string }) => <EditForm formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <PreviewForm formId={Number(id)} />
  ),
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
