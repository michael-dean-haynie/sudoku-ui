import { initialize } from "./initialize.js"
import { strategyExecutionStart } from "./strategy-execution-start.js";
import { analysisBaseCellSet } from "./analysis-base-cell-set.js";
import { unitFocused } from "./unit-focused.js";
import { cellInspected } from "./cell-inspected.js";
import { cellContributed } from "./cell-contributed.js";
import { progressMade } from "./progress-made.js";
import { progressFocusCleared } from "./progress-focus-cleared.js";
import { unitFocusCleared } from "./unit-focus-cleared.js";

export const eventHandlers = {
    'initialize': initialize,
    'strategy-execution-start': strategyExecutionStart,
    'analysis-base-cell-set': analysisBaseCellSet,
    'unit-focused': unitFocused,
    'cell-inspected': cellInspected,
    'cell-contributed': cellContributed,
    'progress-made': progressMade,
    'progress-focus-cleared': progressFocusCleared,
    'unit-focus-cleared': unitFocusCleared
}