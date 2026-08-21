import { useNavigate } from "react-router-dom";
import { progressTest01 } from "../features/progress-tests/content/progressTest01";
import ProgressTestEngine from "../features/progress-tests/engine/ProgressTestEngine";

export default function ProgressTest01Page() {
  const navigate = useNavigate();
  return (
    <ProgressTestEngine
      test={progressTest01}
      onContinue={() => navigate("/lesson-v2/lesson11")}
      onReview={() => navigate("/lesson-v2/lesson1")}
    />
  );
}
