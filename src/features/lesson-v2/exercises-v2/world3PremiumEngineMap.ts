export type World3PremiumEngineKey =
  | "regrouping-exchange"
  | "bridge-to-ten"
  | "image-choice"
  | "numbers-to-39"
  | "add-sub-story"
  | "tap-classification"
  | "tap-sequence"
  | "alignment-hotspot"
  | "table-reading";

export type World3PremiumEngineConfig = {
  lessonId: number;
  engineKey: World3PremiumEngineKey;
  componentName: string;
  interaction:
    | "tap"
    | "choice"
    | "build"
    | "sequence"
    | "hotspot"
    | "table";
  implementation: "existing" | "new";
};

export const WORLD3_PREMIUM_ENGINE_MAP:
  World3PremiumEngineConfig[] = [
    {
      lessonId: 53,
      engineKey: "regrouping-exchange",
      componentName: "RegroupingExchangeExerciseV2",
      interaction: "build",
      implementation: "existing",
    },
    {
      lessonId: 54,
      engineKey: "bridge-to-ten",
      componentName: "BridgeToTenPremiumV2",
      interaction: "build",
      implementation: "new",
    },
    {
      lessonId: 55,
      engineKey: "image-choice",
      componentName: "TapSelectImagesV2",
      interaction: "choice",
      implementation: "existing",
    },
    {
      lessonId: 56,
      engineKey: "numbers-to-39",
      componentName: "NumbersTo39ExerciseV2",
      interaction: "tap",
      implementation: "existing",
    },
    {
      lessonId: 57,
      engineKey: "add-sub-story",
      componentName: "AddSubStoryLabV2",
      interaction: "choice",
      implementation: "existing",
    },
    {
      lessonId: 58,
      engineKey: "tap-classification",
      componentName: "TapClassificationPremiumV2",
      interaction: "tap",
      implementation: "new",
    },
    {
      lessonId: 59,
      engineKey: "tap-sequence",
      componentName: "TapSequencePremiumV2",
      interaction: "sequence",
      implementation: "new",
    },
    {
      lessonId: 60,
      engineKey: "alignment-hotspot",
      componentName: "AlignmentHotspotPremiumV2",
      interaction: "hotspot",
      implementation: "new",
    },
    {
      lessonId: 61,
      engineKey: "tap-classification",
      componentName: "TapClassificationPremiumV2",
      interaction: "tap",
      implementation: "new",
    },
    {
      lessonId: 62,
      engineKey: "numbers-to-39",
      componentName: "NumbersTo39ExerciseV2",
      interaction: "tap",
      implementation: "existing",
    },
    {
      lessonId: 63,
      engineKey: "table-reading",
      componentName: "TableReadingExerciseV2",
      interaction: "table",
      implementation: "existing",
    },
  ];

export function getWorld3PremiumEngine(
  lessonId: number,
): World3PremiumEngineConfig | undefined {
  return WORLD3_PREMIUM_ENGINE_MAP.find(
    (entry) => entry.lessonId === lessonId,
  );
}
