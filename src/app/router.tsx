
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './shells/AppLayout'
import { LandingPage } from '@pages/landing'
import { SearchPage } from '@pages/search'
import { DeveloperPage } from '@pages/developer'
import { ComplexPage } from '@pages/complex'
import { ComparePage } from '@pages/compare'
import { TMAShell } from '@pages/tma/shell'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/developer/:id', element: <DeveloperPage /> },
      { path: '/complex/:id', element: <ComplexPage /> },
      { path: '/compare', element: <ComparePage /> },
    ]
  },
  {
    path: '/tma',
    element: <TMAShell />,
    children: [
      { path: 'search', element: <SearchPage variant="tma" /> },
      { path: 'developer/:id', element: <DeveloperPage variant="tma" /> },
      { path: 'complex/:id', element: <ComplexPage variant="tma" /> },
      { path: 'compare', element: <ComparePage variant="tma" /> },
    ]
  }
])
