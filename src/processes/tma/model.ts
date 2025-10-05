import { createEffect, createEvent, createStore, sample } from 'effector';
import { getWebApp, applyThemeParams } from '@/shared/lib/telegram';

// события
export const tmaInitRequested = createEvent();
export const tmaBackRequested = createEvent();       // пользователь нажал back
export const tmaMainBtnClicked = createEvent();      // пользователь нажал main btn
export const tmaSetMainBtn = createEvent<{ text?: string; visible?: boolean; loading?: boolean; }>();

// состояние
export const $isTMA = createStore(false);
export const $tg = createStore<ReturnType<typeof getWebApp> | null>(null);
export const $initData = createStore<string | null>(null);
export const $mainBtn = createStore<{ text: string; visible: boolean; loading: boolean }>({
	text: 'Продолжить',
	visible: false,
	loading: false,
});

// эффект инициализации
export const tmaInitFx = createEffect(async () => {
	const tg = getWebApp();
	if (!tg) return { tg: null, isTMA: false, initData: null as string | null };

	// базовая подготовка TMA
	try {
		tg.expand();
	} catch {}
	// тема
	applyThemeParams(tg);

	// события кнопок → пробросим наружу
	tg.onEvent('backButtonClicked', () => {
		tmaBackRequested();
	});
	tg.onEvent('mainButtonClicked', () => {
		tmaMainBtnClicked();
	});

	// покажем back-кнопку по умолчанию на вложенных экранах — контролируйте из Shell
	try { tg.BackButton.show(); } catch {}

	// initData можно отправить на бэкенд для валидации подписи
	const initData = tg.initData ?? null;

	return { tg, isTMA: true, initData };
});

// реакция на init
$tg.on(tmaInitFx.doneData, (_, p) => p.tg);
$isTMA.on(tmaInitFx.doneData, (_, p) => p.isTMA);
$initData.on(tmaInitFx.doneData, (_, p) => p.initData);

// управление MainButton через стор
$mainBtn.on(tmaSetMainBtn, (s, p) => ({
	text: p.text ?? s.text,
	visible: p.visible ?? s.visible,
	loading: p.loading ?? s.loading,
}));

// синхронизируем состояние MainButton с реальным tg
sample({
	clock: [$tg.updates, $mainBtn.updates],
	source: { tg: $tg, btn: $mainBtn },
	fn: ({ tg, btn }) => ({ tg, btn }),
	target: createEffect(({ tg, btn }: any) => {
		if (!tg) return;
		try {
			if (btn.text) tg.MainButton.setText(btn.text);
			btn.visible ? tg.MainButton.show() : tg.MainButton.hide();
			tg.MainButton.isProgressVisible = !!btn.loading;
			if (btn.loading) tg.MainButton.showProgress(); else tg.MainButton.hideProgress();
		} catch {}
	}),
});

// публичный запуск
sample({ clock: tmaInitRequested, target: tmaInitFx });