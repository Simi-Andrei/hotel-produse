import connectDB from "@/lib/database";
import User from "@/models/user";
import UsersList from "@/app/components/usersList/UsersList";
import PrimaryButton from "@/app/components/primaryButton/PrimaryButton";

export const getUsers = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    return users;
  } catch (error) {
    console.log(error);
  }
};

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="h-full flex flex-col justify-center text-sm">
      <div className="py-1 flex items-center justify-between">
        <PrimaryButton
          role="link"
          href="/users/add"
          label="+ Adauga utilizator"
        />
      </div>
      <div className="py-1 flex-1">
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default UsersPage;
