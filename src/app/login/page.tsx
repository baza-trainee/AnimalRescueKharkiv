import Login from "../../components/crm/Login";

export default function LoginPage() {
  const domain = "crm";
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Login domain={domain} />
    </div>
  );
}
