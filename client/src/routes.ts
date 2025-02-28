import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import ListPage from "./pages/ListPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { paths } from "./paths";

interface IComponent {
  path: string;
  Component: () => React.JSX.Element;
}

export const routes: IComponent[] = [
  {
    path: paths.Form,
    Component: FormPage,
  },
  {
    path: paths.Item + ":id",
    Component: ItemPage,
  },
  {
    path: paths.List,
    Component: ListPage,
  },
  {
    path: paths.Home,
    Component: Home,
  },
  {
    path: paths.Login,
    Component: Login,
  },
  {
    path: paths.NotFound,
    Component: NotFound,
  },
];
