import { createEffect, sample } from 'effector';
import { tmaBackRequested } from './model';

// Effect, который реально выполняет history.back()
export const goBackFx = createEffect<void, void>(() => {
	window.history.back();
});

// Когда в TMA нажимают BackButton → триггерим goBackFx
sample({
	clock: tmaBackRequested,
	target: goBackFx,
});