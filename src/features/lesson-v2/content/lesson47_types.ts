export type GridDirection =
  | "up"
  | "down"
  | "left"
  | "right";

export type GridCoord = {
  row: number;
  col: number;
};

export type GridLandmark = {
  id: string;
  label: string;
  icon: string;
  position: GridCoord;
};

export type GridRouteOption = {
  id: string;
  route: GridDirection[];
};

type GridNavigationBase = {
  id: string;
  title: string;
  question: string;
  question_audio_key: string;
  rows: number;
  cols: number;
  start: GridCoord;
};

export type IdentifyDirectionItem =
  GridNavigationBase & {
    mode: "identify-direction";
    direction: GridDirection;
    answer: GridDirection;
    options: GridDirection[];
  };

export type FindDestinationItem =
  GridNavigationBase & {
    mode: "find-destination";
    route: GridDirection[];
    landmarks: GridLandmark[];
    answer: string;
    options: string[];
  };

export type MissingArrowItem =
  GridNavigationBase & {
    mode: "missing-arrow";
    goal: GridCoord;
    route: Array<GridDirection | null>;
    missingIndex: number;
    answer: GridDirection;
    options: GridDirection[];
  };

export type MatchRouteItem =
  GridNavigationBase & {
    mode: "match-route";
    goal: GridCoord;
    route: GridDirection[];
    pathCells: GridCoord[];
    landmarks?: GridLandmark[];
    answer: string;
    options: GridRouteOption[];
  };

export type GridNavigationItem =
  | IdentifyDirectionItem
  | FindDestinationItem
  | MissingArrowItem
  | MatchRouteItem;
