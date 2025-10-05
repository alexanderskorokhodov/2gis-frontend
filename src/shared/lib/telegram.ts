// безопасный доступ к Telegram.WebApp
export type TGWebApp = typeof window.Telegram.WebApp;

export function getWebApp(): TGWebApp | null {
	// в вебе этого объекта нет — возвращаем null
	// в TMA — есть
	const tg = (window as any)?.Telegram?.WebApp;
	return tg ?? null;
}

export function applyThemeParams(tg: TGWebApp | null) {
	if (!tg?.themeParams) return;
	const root = document.documentElement;
	const tp = tg.themeParams as Record<string, string>;
	// маппим themeParams в CSS custom properties
	Object.entries(tp).forEach(([k, v]) => {
		// v в формате #RRGGBB — сохраним как есть
		root.style.setProperty(`--tg-${ k }`, v);
	});
}