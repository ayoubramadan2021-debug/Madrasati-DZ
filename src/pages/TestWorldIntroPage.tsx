import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import { useNavigate } from "react-router-dom";

export default function TestWorldIntroPage() {
  const navigate = useNavigate();

  const slides = [
    {
      scene_image: "/scenes/world_1_intro/scene_1_arrival.webp",
      audio_key: "w1_intro_1",
    },
    {
      scene_image: "/scenes/world_1_intro/scene_2_courtyard.webp",
      audio_key: "w1_intro_2",
    },
    {
      scene_image: "/scenes/world_1_intro/scene_3_meet_teachers.webp",
      audio_key: "w1_intro_3a",
    },
    {
      scene_image: "/scenes/world_1_intro/scene_4_sitting.webp",
      audio_key: "w1_intro_4",
    },
    {
      scene_image: "/scenes/world_1_intro/scene_5_question.webp",
      audio_key: "w1_intro_5_q",
      audio_correct: "w1_intro_correct",
      audio_retry: "w1_intro_retry",
      options: [
        { id: "a", text: "يُلْقِي السَّلَام عَلَى الْأُسْتَاذِ وَزُمَلَائِه", correct: true },
        { id: "b", text: "يَجْلِسُ فِي مَكَانِه بِأَدَب", correct: true },
        { id: "c", text: "يَسْتَمِعُ لِمَا تَقُولُهُ الْمُعَلِّمَة", correct: true },
      ],
    },
    {
      scene_image: "/scenes/world_1_intro/scene_6_celebration.webp",
      audio_key: "w1_intro_6",
      is_closing: true,
      cta_text: "اِسْتَكْشِفِ الْعَالَم ←",
    },
  ];

  return (
    <WorldIntroSceneV2
      audio_base="/audio/world_1_intro"
      slides={slides}
      onDone={() => navigate("/section/math")}
    />
  );
}
