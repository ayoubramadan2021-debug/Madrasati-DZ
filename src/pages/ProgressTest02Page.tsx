import { useNavigate } from "react-router-dom";
import { progressTest02 } from "../features/progress-tests/content/progressTest02";
import ProgressTestEngine from "../features/progress-tests/engine/ProgressTestEngine";

export default function ProgressTest02Page() {
  const navigate = useNavigate();

  return (
    <ProgressTestEngine
      test={progressTest02}
      continueLabel="🔓 الدرس 21"
      onContinue={() => navigate("/lesson-v2/lesson21")}
      onReview={() => navigate("/lesson-v2/lesson11")}
    />
  );
}
