/**
 * Emit an error.
 */
export interface EmitErrorAction{
    type: 'error:emit';
    error: Error;
}
export function emitErrorAction(error: Error): EmitErrorAction{
    return {
        type: 'error:emit',
        error,
    };
}

export type ErrorAction =
    EmitErrorAction;
