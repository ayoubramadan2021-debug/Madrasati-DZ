import { supabase } from "../../lib/supabaseClient";
import { saveProgress } from "../../services/progressService";
import type { ProgressTestResult } from "./types";

const STORAGE_KEY = "taalim-dz-progress-tests-v1";
const SERVER_LESSON_KEY_PREFIX = "progress-test:";

export interface StoredProgressTest {
  attempts: number;
  bestScore: number;
  lastScore: number;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  rankingContribution: number;
  totalXpGranted: number;
  completionXpGranted: boolean;
  passXpGranted: boolean;
  threeStarXpGranted: boolean;
  serverSynced: boolean;
  updatedAt: string;
}

type Store = Record<string, StoredProgressTest>;

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // The server remains the authority for ranking contribution when available.
  }
}

async function getServerBest(testId: string): Promise<{
  userId: string | null;
  bestScore: number;
  passed: boolean;
}> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id ?? null;
    if (!userId) return { userId: null, bestScore: 0, passed: false };

    const lessonKey = `${SERVER_LESSON_KEY_PREFIX}${testId}`;
    const { data, error } = await supabase
      .from("progress")
      .select("points,completed")
      .eq("user_id", userId)
      .eq("lesson_id", lessonKey)
      .maybeSingle();

    if (error) {
      console.warn("PT server read skipped:", error.message);
      return { userId, bestScore: 0, passed: false };
    }

    return {
      userId,
      bestScore: Number(data?.points ?? 0),
      passed: Boolean(data?.completed),
    };
  } catch (error) {
    console.warn("PT server read failed:", error);
    return { userId: null, bestScore: 0, passed: false };
  }
}


export function getStoredProgressTest(testId: string): StoredProgressTest | null {
  return readStore()[testId] ?? null;
}

export async function getProgressTestStatus(testId: string): Promise<StoredProgressTest | null> {
  const local = getStoredProgressTest(testId);
  const server = await getServerBest(testId);

  if (!local && !server.userId) return null;

  const bestScore = Math.max(local?.bestScore ?? 0, server.bestScore);
  const passed = Boolean(local?.passed || server.passed || bestScore >= 70);
  const stars = (
    bestScore >= 90 ? 3 :
    bestScore >= 70 ? 2 :
    bestScore >= 50 ? 1 : 0
  ) as 0 | 1 | 2 | 3;

  return {
    attempts: local?.attempts ?? 0,
    bestScore,
    lastScore: local?.lastScore ?? server.bestScore,
    passed,
    stars: Math.max(local?.stars ?? 0, stars) as 0 | 1 | 2 | 3,
    rankingContribution: Math.max(local?.rankingContribution ?? 0, server.bestScore),
    totalXpGranted: local?.totalXpGranted ?? 0,
    completionXpGranted: local?.completionXpGranted ?? false,
    passXpGranted: local?.passXpGranted ?? false,
    threeStarXpGranted: local?.threeStarXpGranted ?? false,
    serverSynced: Boolean(server.userId && (server.bestScore > 0 || server.passed)),
    updatedAt: local?.updatedAt ?? new Date(0).toISOString(),
  };
}

export async function recordProgressTestResult(result: ProgressTestResult) {
  const store = readStore();
  const previous = store[result.testId];
  const server = await getServerBest(result.testId);

  const oldBest = Math.max(previous?.bestScore ?? 0, server.bestScore);
  const bestScore = Math.max(oldBest, result.score);
  const rankingAddedNow = Math.max(0, bestScore - oldBest);

  let xpAwardedNow = 0;
  let completionXpGranted = previous?.completionXpGranted ?? false;
  let passXpGranted = previous?.passXpGranted ?? false;
  let threeStarXpGranted = previous?.threeStarXpGranted ?? false;

  if (!completionXpGranted) {
    xpAwardedNow += 50;
    completionXpGranted = true;
  }
  if (result.passed && !passXpGranted) {
    xpAwardedNow += 25;
    passXpGranted = true;
  }
  if (result.stars === 3 && !threeStarXpGranted) {
    xpAwardedNow += 25;
    threeStarXpGranted = true;
  }

  let serverSynced = false;
  if (server.userId) {
    try {
      // Idempotent: progress.points stores the BEST mastery score, never an additive replay reward.
      await saveProgress(
        server.userId,
        `${SERVER_LESSON_KEY_PREFIX}${result.testId}`,
        bestScore,
        server.passed || result.passed,
      );
      serverSynced = true;
    } catch (error) {
      // Do not lose the child's assessment if the current Supabase schema rejects a synthetic test key.
      // The UI exposes serverSynced=false so production deployment can require the dedicated schema later.
      console.warn("PT server sync failed:", error);
    }
  }

  const record: StoredProgressTest = {
    attempts: (previous?.attempts ?? 0) + 1,
    bestScore,
    lastScore: result.score,
    passed: (previous?.passed ?? false) || server.passed || result.passed,
    stars: Math.max(previous?.stars ?? 0, result.stars) as 0 | 1 | 2 | 3,
    rankingContribution: bestScore,
    totalXpGranted: (previous?.totalXpGranted ?? 0) + xpAwardedNow,
    completionXpGranted,
    passXpGranted,
    threeStarXpGranted,
    serverSynced,
    updatedAt: new Date().toISOString(),
  };

  store[result.testId] = record;
  writeStore(store);

  window.dispatchEvent(
    new CustomEvent("taalim-dz:progress-test-completed", {
      detail: { result, record, xpAwardedNow, rankingAddedNow },
    }),
  );

  return { record, xpAwardedNow, rankingAddedNow };
}
