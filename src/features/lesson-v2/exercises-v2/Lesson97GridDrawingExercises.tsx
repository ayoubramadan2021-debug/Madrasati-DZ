import React from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";
import GridDrawingExerciseV2, {
  GridDrawingActivityV2,
  GridSegment,
} from "./GridDrawingExerciseV2";

type GridQuestion = {
  id: string;
  mission: number;
  prompt: string;
  audioKey: string;
  gridDrawing: GridDrawingActivityV2;
};

type LessonConfig = {
  lessonKey: string;
  audioBase: string;
  missionTitles: Record<number, string>;
  completionMessage: string;
  nextPath: string;
  questions: GridQuestion[];
};

const s = (x1: number, y1: number, x2: number, y2: number): GridSegment => ({
  from: { x: x1, y: y1 },
  to: { x: x2, y: y2 },
});

const LESSONS: Record<number, LessonConfig> = {
  97: {
    lessonKey: "lesson97",
    audioBase: "/audio/teachers/khalil/lesson_97_draw_on_grid/exercises",
    missionTitles: {
      1: "أُكْمِلُ الرَّسْمَ",
      2: "أَرْسُمُ مِثْلَ النَّمُوذَجِ",
      3: "أُحَدِّدُ طَرَفَيِ الْقِطْعَةِ",
      4: "أَرْسُمُ شَكْلًا عَلَى مَرْصُوفَةٍ",
    },
    completionMessage:
      "أَحْسَنْتَ! أَصْبَحْتَ تَرْسُمُ عَلَى الْمَرْصُوفَةِ بِدِقَّةٍ.",
    nextPath: "/lesson-v2/98",
    questions: [
      {
        id: "l97_ex1_q1",
        mission: 1,
        prompt: "أَكْمِلْ رَسْمَ الْبَيْتِ.",
        audioKey: "l97_ex1_q1",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 1, 2, 4),
            s(2, 4, 4, 6),
            s(4, 6, 6, 4),
            s(2, 1, 6, 1),
          ],
          targetSegments: [s(6, 1, 6, 4)],
          workLabel: "أُكْمِلُ الرَّسْمَ",
          tip: "أَرْسُمُ الْقِطْعَةَ النَّاقِصَةَ لِإِكْمَالِ الْبَيْتِ.",
        },
      },
      {
        id: "l97_ex1_q2",
        mission: 1,
        prompt: "أَكْمِلْ رَسْمَ السَّقْفِ.",
        audioKey: "l97_ex1_q2",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 1, 2, 4),
            s(6, 1, 6, 4),
            s(2, 1, 6, 1),
            s(2, 4, 4, 6),
          ],
          targetSegments: [s(4, 6, 6, 4)],
          workLabel: "أُكْمِلُ الرَّسْمَ",
          tip: "أُكْمِلُ جَانِبَ السَّقْفِ النَّاقِصَ.",
        },
      },
      {
        id: "l97_ex1_q3",
        mission: 1,
        prompt: "أَكْمِلْ رَسْمَ الْمُرَبَّعِ.",
        audioKey: "l97_ex1_q3",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 2, 5, 2),
            s(2, 5, 5, 5),
            s(2, 2, 2, 5),
          ],
          targetSegments: [s(5, 2, 5, 5)],
          workLabel: "أُكْمِلُ الرَّسْمَ",
          tip: "أَرْسُمُ الضِّلْعَ النَّاقِصَ.",
        },
      },
      {
        id: "l97_ex1_q4",
        mission: 1,
        prompt: "أَكْمِلْ رَسْمَ الْمُثَلَّثِ.",
        audioKey: "l97_ex1_q4",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 2, 6, 2),
            s(2, 2, 4, 5),
          ],
          targetSegments: [
            s(4, 5, 6, 2),
          ],
          workLabel: "أُكْمِلُ الرَّسْمَ",
          tip: "أُكْمِلُ الْجَانِبَ النَّاقِصَ لِلْمُثَلَّثِ.",
        },
      },

      {
        id: "l97_ex2_q1",
        mission: 2,
        prompt: "اِرْسُمْ مِثْلَ النَّمُوذَجِ مِنَ النُّقْطَةِ الْخَضْرَاءِ.",
        audioKey: "l97_ex2_q1",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          modelSegments: [
            s(1, 1, 4, 1),
            s(4, 1, 4, 4),
            s(4, 4, 1, 4),
            s(1, 4, 1, 1),
          ],
          targetSegments: [
            s(1, 1, 4, 1),
            s(4, 1, 4, 4),
            s(4, 4, 1, 4),
            s(1, 4, 1, 1),
          ],
          startPoint: { x: 1, y: 1 },
          modelLabel: "النَّمُوذَجُ",
          workLabel: "أَرْسُمُ مِثْلَهُ",
          tip: "أَنْسَخُ الشَّكْلَ عَلَى الْمَرْصُوفَةِ.",
        },
      },
      {
        id: "l97_ex2_q2",
        mission: 2,
        prompt: "اِرْسُمْ مِثْلَ النَّمُوذَجِ مِنَ النُّقْطَةِ الْخَضْرَاءِ.",
        audioKey: "l97_ex2_q2",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          modelSegments: [
            s(1, 1, 5, 1),
            s(5, 1, 3, 4),
            s(3, 4, 1, 1),
          ],
          targetSegments: [
            s(1, 1, 5, 1),
            s(5, 1, 3, 4),
            s(3, 4, 1, 1),
          ],
          startPoint: { x: 1, y: 1 },
          modelLabel: "النَّمُوذَجُ",
          workLabel: "أَرْسُمُ مِثْلَهُ",
          tip: "أَنْسَخُ الْمُثَلَّثَ.",
        },
      },
      {
        id: "l97_ex2_q3",
        mission: 2,
        prompt: "اِرْسُمْ مِثْلَ النَّمُوذَجِ مِنَ النُّقْطَةِ الْخَضْرَاءِ.",
        audioKey: "l97_ex2_q3",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          modelSegments: [
            s(3, 1, 5, 3),
            s(5, 3, 3, 5),
            s(3, 5, 1, 3),
            s(1, 3, 3, 1),
          ],
          targetSegments: [
            s(3, 1, 5, 3),
            s(5, 3, 3, 5),
            s(3, 5, 1, 3),
            s(1, 3, 3, 1),
          ],
          startPoint: { x: 3, y: 1 },
          modelLabel: "النَّمُوذَجُ",
          workLabel: "أَرْسُمُ مِثْلَهُ",
          tip: "أَنْسَخُ الشَّكْلَ الْمُعَيَّنَ.",
        },
      },
      {
        id: "l97_ex2_q4",
        mission: 2,
        prompt: "اِرْسُمْ مِثْلَ النَّمُوذَجِ مِنَ النُّقْطَةِ الْخَضْرَاءِ.",
        audioKey: "l97_ex2_q4",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          modelSegments: [
            s(1, 1, 5, 1),
            s(1, 1, 1, 4),
            s(5, 1, 5, 4),
            s(1, 4, 3, 6),
            s(3, 6, 5, 4),
          ],
          targetSegments: [
            s(1, 1, 5, 1),
            s(1, 1, 1, 4),
            s(5, 1, 5, 4),
            s(1, 4, 3, 6),
            s(3, 6, 5, 4),
          ],
          startPoint: { x: 1, y: 1 },
          modelLabel: "النَّمُوذَجُ",
          workLabel: "أَرْسُمُ مِثْلَهُ",
          tip: "أَنْسَخُ شَكْلَ الْبَيْتِ.",
        },
      },

      {
        id: "l97_ex3_q1",
        mission: 3,
        prompt: "حَدِّدْ طَرَفَيِ الْقِطْعَةِ النَّاقِصَةِ.",
        audioKey: "l97_ex3_q1",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 2, 5, 2),
            s(5, 2, 5, 5),
            s(5, 5, 2, 5),
          ],
          targetSegments: [s(2, 5, 2, 2)],
          workLabel: "أُحَدِّدُ الطَّرَفَيْنِ",
          tip: "صِلْ بَيْنَ النُّقْطَتَيْنِ لِإِتْمَامِ الشَّكْلِ.",
        },
      },
      {
        id: "l97_ex3_q2",
        mission: 3,
        prompt: "حَدِّدْ طَرَفَيِ الْقِطْعَةِ النَّاقِصَةِ.",
        audioKey: "l97_ex3_q2",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 1, 2, 4),
            s(2, 4, 4, 6),
            s(4, 6, 6, 4),
            s(2, 1, 6, 1),
          ],
          targetSegments: [s(6, 1, 6, 4)],
          workLabel: "أُحَدِّدُ الطَّرَفَيْنِ",
          tip: "أُكْمِلُ الْبَيْتَ بِقِطْعَةٍ وَاحِدَةٍ.",
        },
      },
      {
        id: "l97_ex3_q3",
        mission: 3,
        prompt: "حَدِّدْ طَرَفَيِ الْقِطْعَةِ النَّاقِصَةِ.",
        audioKey: "l97_ex3_q3",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(2, 2, 4, 5),
            s(4, 5, 6, 2),
          ],
          targetSegments: [s(2, 2, 6, 2)],
          workLabel: "أُحَدِّدُ الطَّرَفَيْنِ",
          tip: "أُكْمِلُ الْمُثَلَّثَ.",
        },
      },
      {
        id: "l97_ex3_q4",
        mission: 3,
        prompt: "حَدِّدْ طَرَفَيِ الْقِطْعَةِ النَّاقِصَةِ.",
        audioKey: "l97_ex3_q4",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          starterSegments: [
            s(3, 1, 5, 3),
            s(5, 3, 3, 5),
            s(3, 5, 1, 3),
          ],
          targetSegments: [s(1, 3, 3, 1)],
          workLabel: "أُحَدِّدُ الطَّرَفَيْنِ",
          tip: "أُكْمِلُ الشَّكْلَ الْمُعَيَّنَ.",
        },
      },

      {
        id: "l97_ex4_q1",
        mission: 4,
        prompt: "اِرْسُمْ مُرَبَّعًا عَلَى الْمَرْصُوفَةِ.",
        audioKey: "l97_ex4_q1",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          targetSegments: [
            s(2, 2, 5, 2),
            s(5, 2, 5, 5),
            s(5, 5, 2, 5),
            s(2, 5, 2, 2),
          ],
          startPoint: { x: 2, y: 2 },
          guidePoints: [
            { x: 2, y: 2 },
            { x: 5, y: 2 },
            { x: 5, y: 5 },
            { x: 2, y: 5 },
          ],

          workLabel: "أَرْسُمُ الشَّكْلَ",
          tip: "اِضْغَطْ عَلَى النِّقَاطِ 1 ثُمَّ 2، وَوَاصِلْ حَتَّى تُكْمِلَ الْمُرَبَّعَ.",
        },
      },
      {
        id: "l97_ex4_q2",
        mission: 4,
        prompt: "اِرْسُمْ مُسْتَطِيلًا عَلَى الْمَرْصُوفَةِ.",
        audioKey: "l97_ex4_q2",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          targetSegments: [
            s(1, 2, 6, 2),
            s(6, 2, 6, 4),
            s(6, 4, 1, 4),
            s(1, 4, 1, 2),
          ],
          startPoint: { x: 1, y: 2 },
          guidePoints: [
            { x: 1, y: 2 },
            { x: 6, y: 2 },
            { x: 6, y: 4 },
            { x: 1, y: 4 },
          ],

          workLabel: "أَرْسُمُ الشَّكْلَ",
          tip: "اِضْغَطْ عَلَى النِّقَاطِ الْمُرَقَّمَةِ بِالتَّرْتِيبِ لِتَكْوِينِ الْمُسْتَطِيلِ.",
        },
      },
      {
        id: "l97_ex4_q3",
        mission: 4,
        prompt: "اِرْسُمْ مُثَلَّثًا عَلَى الْمَرْصُوفَةِ.",
        audioKey: "l97_ex4_q3",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          targetSegments: [
            s(2, 1, 6, 1),
            s(6, 1, 4, 5),
            s(4, 5, 2, 1),
          ],
          startPoint: { x: 2, y: 1 },
          guidePoints: [
            { x: 2, y: 1 },
            { x: 6, y: 1 },
            { x: 4, y: 5 },
          ],

          workLabel: "أَرْسُمُ الشَّكْلَ",
          tip: "اِضْغَطْ عَلَى النِّقَاطِ 1 ثُمَّ 2 ثُمَّ 3، ثُمَّ عُدْ إِلَى النُّقْطَةِ 1.",
        },
      },
      {
        id: "l97_ex4_q4",
        mission: 4,
        prompt: "اِرْسُمْ بَيْتًا بَسِيطًا عَلَى الْمَرْصُوفَةِ.",
        audioKey: "l97_ex4_q4",
        gridDrawing: {
          grid: { cols: 8, rows: 8 },
          targetSegments: [
            s(2, 1, 6, 1),
            s(2, 1, 2, 4),
            s(6, 1, 6, 4),
            s(2, 4, 4, 6),
            s(4, 6, 6, 4),
          ],
          startPoint: { x: 2, y: 1 },
          guidePoints: [
            { x: 2, y: 1 },
            { x: 6, y: 1 },
            { x: 6, y: 4 },
            { x: 4, y: 6 },
            { x: 2, y: 4 },
          ],

          workLabel: "أَرْسُمُ الشَّكْلَ",
          tip: "اِضْغَطْ عَلَى النِّقَاطِ الْمُرَقَّمَةِ لِتَكْوِينِ شَكْلِ الْبَيْتِ.",
        },
      },
    ],
  },
};

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}: any) {
  return (
    <GridDrawingExerciseV2
      questionId={question.id}
      activity={question.gridDrawing}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

export function Lesson97GridDrawingExercises() {
  const config = LESSONS[97];

  return (
    <UnifiedLessonExercisesV2
      lessonKey={config.lessonKey}
      audioBase={config.audioBase}
      questions={config.questions}
      missionTitles={config.missionTitles}
      missionCount={4}
      completionMessage={config.completionMessage}
      nextPath={config.nextPath}
      nextLabel="الدَّرْسُ التَّالِي"
      renderActivity={renderActivity}
    />
  );
}

export default Lesson97GridDrawingExercises;
