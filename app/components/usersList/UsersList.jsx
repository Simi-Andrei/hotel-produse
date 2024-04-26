import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import DeleteUserButton from "@/app/components/deleteUserButton/DeleteUserButton";

const UsersList = ({ users }) => {
  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr className="text-xs text-left">
            <th className="border border-gray-200 py-1.5 px-1 text-center w-1/12">
              Nr. Crt.
            </th>
            <th className="border border-gray-200 py-1.5 px-1 w-5/12">NUME</th>
            <th className="border border-gray-200 py-1.5 px-1 w-5/12">EMAIL</th>
            <th className="border border-gray-200 py-1.5 px-1 text-center w-1/12">
              ACTIUNI
            </th>
          </tr>
        </thead>
        {users.length === 0 ? (
          <tbody>
            <tr>
              <td
                className="border border-gray-200 py-0.5 px-1 text-center"
                colSpan={8}
              >
                <p>
                  Nu exista utilizatori. Adauga utilizator apasand pe butonul de
                  mai sus.
                </p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-xs">
                <td className="border border-gray-200 py-0.5 px-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {user.name}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {user.email}
                </td>

                <td className="border border-gray-200 py-0.5 px-1">
                  <div className="flex items-center justify-evenly">
                    <Link
                      className="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-200 duration-500"
                      href={`/products/${user._id}/edit`}
                    >
                      <FaEdit className="text-blue-500" />
                    </Link>
                    <DeleteUserButton userId={JSON.stringify(user._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UsersList;
