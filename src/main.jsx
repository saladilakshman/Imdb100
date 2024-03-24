import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<CircularProgress color="primary" sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100svh'
  }} />}>
    <App />
  </Suspense>,
)
