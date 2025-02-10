import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import ListPage from "./pages/ListPage";
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
    path: paths.Item,
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
];
