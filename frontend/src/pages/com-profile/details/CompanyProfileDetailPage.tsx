import { useParams } from "react-router-dom";
import { useCompanyProfileById } from "../../../hooks/com-profile/useCompanyProfiles";

const CompanyProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { profile, loading } = useCompanyProfileById(id);

  if (loading) return <p>Загрузка...</p>;
  if (!profile) return <p>Профиль не найден</p>;

  return (
    <div>
      
      <h2>{profile.companyName}</h2>
      <p><strong>Адрес:</strong> {profile.address}</p>
      <p><strong>Телефон:</strong> {profile.phone}</p>
      <p><strong>ФИО директора:</strong> {profile.directorFullName}</p>
      <p><strong>Может проводить практику:</strong> {profile.canProvideInternship ? "Да" : "Нет"}</p>
      <p><strong>В лице:</strong> {profile.representedBy}</p>
      <p><strong>На основании:</strong> {profile.basis}</p>
      
      <p><strong>БИН:</strong> {profile.BIN}</p>
      <p><strong>БИК:</strong> {profile.BIK}</p>
      <p><strong>КБЕ:</strong> {profile.KBE}</p>
      <p><strong>Банк:</strong> {profile.BANK}</p>
    </div>
  );
};

export default CompanyProfileDetailPage;
