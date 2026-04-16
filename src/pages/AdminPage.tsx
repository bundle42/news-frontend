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
    fetchMembers(); // 삭제 후 새로고침
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>관리자 - 회원 목록</h1>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={th}>ID</th>
            <th style={th}>Email</th>
            <th style={th}>Name</th>
            <th style={th}>Password</th>
            <th style={th}>Role</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td style={td}>{m.id}</td>
              <td style={td}>{m.memberEmail}</td>
              <td style={td}>{m.memberName}</td>
              <td style={td}>{m.memberPassword}</td>
              <td style={td}>{m.memberRole}</td>

              <td style={td}>
                <button onClick={() => handleDelete(m.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

export default AdminPage;
