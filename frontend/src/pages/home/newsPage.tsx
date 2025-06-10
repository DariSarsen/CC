import { useHomeData } from "../../hooks/useHomeData";
import LoadingScreen from "../../components/LoadingScreen";
import MainDashboard from "../../components/MainDashboard";
import AlumniSection from "../../components/AlumniSection";

const NewsPage = () => {
  const { notifications, vacancies, resumes, loading } = useHomeData();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="h-max bg-white/70 rounded-2xl p-7">
        <MainDashboard notifications={notifications} vacancies={vacancies} resumes={resumes} />
      </div>

      <AlumniSection/>     
    </>
  );
};

export default NewsPage;