import { initialize } from "./initialize.js"
import { strategyExecutionStart } from "./strategy-execution-start.js";
import { cellTargetedForStrategy } from "./cell-targeted-for-strategy.js";
import { unitFocused } from "./unit-focused.js";
import { cellInspected } from "./cell-inspected.js";

export const eventHandlers = {
    'initialize': initialize,
    'strategy-execution-start': strategyExecutionStart,
    'cell-targeted-for-strategy': cellTargetedForStrategy,
    'unit-focused': unitFocused,
    'cell-inspected': cellInspected

}