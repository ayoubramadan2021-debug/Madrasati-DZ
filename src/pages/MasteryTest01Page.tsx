import { useNavigate } from "react-router-dom";
import { masteryTest01 } from "../features/progress-tests/content/masteryTest01";
import ProgressTestEngine from "../features/progress-tests/engine/ProgressTestEngine";

export default function MasteryTest01Page() {
  const navigate = useNavigate();

  return (
    <ProgressTestEngine
      test={masteryTest01}
      continueLabel="🔓 المرحلة التالية"
      onContinue={() => navigate("/lesson-v2/lesson33")}
      onReview={() => navigate("/lesson-v2/lesson21")}
    />
  );
}
