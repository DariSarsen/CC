import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUsers } from "../../../hooks/admin/useUsers";
import { useDeleteUser } from "../../../hooks/admin/useDeleteUser";
import EditUserModal from "../../../components/EditUserModal";
import CreateUserModal from "../../../components/СreateUserModal";
import { User } from "../../../types/user";

const roles = [
  { value: "all", label: "All Users" },
  { value: "student", label: "Students" },
  { value: "company", label: "Companies" },
  { value: "career_center", label: "Career Center" },
  { value: "admin", label: "Admins" },
];

const UserTablePage = () => {
  const { users, loading, reload } = useUsers();
  const { removeUser } = useDeleteUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleDelete = (id: string) => {
    if (confirm("Удалить пользователя?")) {
      removeUser(id, reload);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 text-white">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => {
              setSelectedRole(role.value);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium ${
              selectedRole === role.value
                ? "bg-white text-red-700"
                : "bg-red-100/20 hover:bg-red-200/30 text-white"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="bg-white/90 backdrop-blur-md text-black rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">General Invoice</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-900"
          >
            + Add New User
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-red-900 border-b text-shadow-2xs/20">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Full Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-3 text-gray-500">
                      {(currentPage - 1) * usersPerPage + index + 1}
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="py-2 px-3 text-blue-600">{user.email}</td>
                    <td className="py-2 px-3 capitalize">{user.role}</td>
                    <td className="py-2 px-3 space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="px-3 py-1 border border-purple-700 text-purple-700 rounded hover:bg-purple-100"
                        title="Редактировать"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 border border-red-700 text-red-700 rounded hover:bg-red-100"
                        title="Удалить"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mt-4 text-sm space-y-2 md:space-y-0">
          <span>
            Showing {paginatedUsers.length} of {filteredUsers.length}
          </span>

          <div className="flex items-center space-x-2">
            <label htmlFor="usersPerPage" className="text-gray-700">
              Rows per page:
            </label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={(e) => {
                setUsersPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdated={reload}
        />
      )}

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreated={reload}
        />
      )}

    </div>
  );
};

export default UserTablePage;
