import { useRecordContext } from "react-admin";

const MyUrlField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <a href={record[source]}>{record[source]}</a>;
};

export default MyUrlField;
