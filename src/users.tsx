// import { List, Datagrid, TextField, EmailField } from 'react-admin'
import { List, SimpleList } from 'react-admin'

export const UsersList = () => (
  <List>
    {/* <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source='email' />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </Datagrid> */}
    <SimpleList primaryText={(record) => record.name} secondaryText={(record) => record.username} tertiaryText={(record) => record.email} />
  </List>
)