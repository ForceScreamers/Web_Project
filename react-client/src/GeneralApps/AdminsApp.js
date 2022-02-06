import ProvidersTable from "../Components/AdminsComponents/ProvidersTable";


const providers = [
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "ssrtstfjgshtrfghsrtfh",
    email: "arsfdgarg",
    phone: "12312313542345",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
]

export default function AdminsApp() {
  return <div>
    <h1>דף מנהל</h1>
    <h2>בעלי מקצוע לאשר</h2>

    <ProvidersTable Providers={providers} />
  </div>;
}
