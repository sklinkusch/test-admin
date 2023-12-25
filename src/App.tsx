import {
  Admin,
  Resource
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UsersList } from "./users";

export const App = () => (
<Admin dataProvider={dataProvider}>
  <Resource name="users" list={UsersList} />
</Admin>
);
