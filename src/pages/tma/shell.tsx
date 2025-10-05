import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { tmaInitRequested, tmaSetMainBtn, $isTMA } from '@/processes/tma/model';

export function TMAShell() {
	const isTMA = useUnit($isTMA);
	const init = useUnit(tmaInitRequested);
	const setMainBtn = useUnit(tmaSetMainBtn);
	const loc = useLocation();

	useEffect(() => {
		init(); // один раз при входе в TMA-оболочку
	}, [init]);

	// Пример: текст/видимость MainButton зависит от текущего роута TMA
	useEffect(() => {
		if (!isTMA) return;
		if (loc.pathname.endsWith('/search')) {
			setMainBtn({text: 'Искать', visible: true, loading: false});
		} else if (loc.pathname.includes('/developer/')) {
			setMainBtn({text: 'AI Summary', visible: true, loading: false});
		} else {
			setMainBtn({visible: false});
		}
	}, [isTMA, loc, setMainBtn]);

	return (
		<div className="min-h-screen bg-white">
			<Outlet/>
		</div>
	);
}