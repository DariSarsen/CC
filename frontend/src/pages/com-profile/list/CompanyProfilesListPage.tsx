import { useCompanyProfiles } from "../../../hooks/com-profile/useCompanyProfiles";
import { Link } from "react-router-dom";

const CompanyProfileListPage = () => {
  const { users, loading } = useCompanyProfiles();

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>База партнеров</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Почта</th>
            <th>Имя</th>
            <th>Компания</th>
            <th>Телефон</th>
            <th>БИН</th>
            <th>Практика</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              
              <td>{user.email ?? "—"}</td>
              <td>{user.name ?? "—"}</td>
              <td>
                {user.CompanyProfile?
                <Link to={`/company/${user.CompanyProfile?.id}`}>
                  {user.CompanyProfile?.companyName}
                </Link>
                :
                "—"
                }
              </td>
              <td>{user.CompanyProfile?.phone  ?? "—"}</td>
              <td>{user.CompanyProfile?.BIN  ?? "—"}</td>
              <td>{user.CompanyProfile?.canProvideInternship ? "✅" : "❌"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyProfileListPage;
