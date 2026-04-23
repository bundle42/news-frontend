import { useEffect, useState } from "react";
import { getMembers, deleteMember, changeRole } from "../api/admin";
import type { Member } from "../types/member";
import client from "../api/client";

function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      alert("회원 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMembers().finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await changeRole(id, role);
      fetchMembers();
    } catch (e) {
      alert("권한 변경 실패");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말 삭제할까요?");
    if (!confirmDelete) return;

    try {
      await deleteMember(id);
      fetchMembers();
    } catch (e) {
      alert("회원 삭제 실패");
    }
  };

  const runNewsImport = async (url: string, label: string) => {
    setActionLoading(true);
    try {
      await client.post(url);
      alert(`${label} 완료`);
    } catch (e) {
      alert(`${label} 실패`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">
          시스템 관리 및 데이터 수집을 수행합니다
        </p>
      </div>

      {/* ACTION SECTION */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <button
              disabled={actionLoading}
              onClick={() =>
                runNewsImport("/api/admin/news/import", "네이버 API 수집")
              }
              className={`px-4 py-2 rounded text-white transition ${
                actionLoading
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              네이버 API 수집
            </button>

            <button
              disabled={actionLoading}
              onClick={() =>
                runNewsImport("/api/admin/news/csvimport", "CSV 수집")
              }
              className={`px-4 py-2 rounded text-white transition ${
                actionLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              CSV 수집
            </button>
          </div>

          <div className="text-sm text-gray-500 flex items-center">
            {actionLoading ? "처리 중..." : "대기 중"}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">전체 회원</p>
          <p className="text-2xl font-bold">{members.length}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold">회원 목록</span>
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

                  <td className="p-3 w-[220px]">
                    <div className="flex items-center gap-2">
                      <select
                        value={m.memberRole}
                        onChange={(e) => handleRoleChange(m.id, e.target.value)}
                        className="px-2 py-1 border rounded text-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
                      >
                        <option value="ROLE_USER">USER</option>
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_BAN">BAN</option>
                      </select>

                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {members.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-10">
              회원이 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
