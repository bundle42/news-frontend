import { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../api/admin";
import type { Member } from "../types/member";

function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말 삭제할까요?");
    if (!confirmDelete) return;

    await deleteMember(id);
    fetchMembers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">
          회원 목록을 관리할 수 있습니다
        </p>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold">전체 회원: {members.length}명</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Name</th>
                <th className="p-3">Password</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{m.id}</td>
                  <td className="p-3">{m.memberEmail}</td>
                  <td className="p-3">{m.memberName}</td>
                  <td className="p-3 text-gray-400">••••••••</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {m.memberRole}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
