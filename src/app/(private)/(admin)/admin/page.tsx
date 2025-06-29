import { fetchAllUsers } from "@/actions/user";
import { User } from "@/models/UserSchema";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Admin Dashboard | Arkin Organics",
  description: "Access the Arkin Organics admin dashboard to manage content, products, orders, users, and platform settings with full control and oversight.",
};

const Admin = async () => {


  const allUsers = await fetchAllUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">users</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers?.map((user) => (
            <tr key={user._id}>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    "use server";
                    await User.findByIdAndDelete(user._id);
                  }}
                >
                  <button className="px-2 py-1 text-red-500 hover:bg-red-100 rounded focus:outline-none">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;