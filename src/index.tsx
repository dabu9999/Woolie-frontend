// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { RouterInfo } from './utils/router';
// import App from './App';
// import Main from './pages/Main';
// import LoginHandler from './pages/LoginHandler';
// import ImageUpload from './pages/ImageUpload';
// import AnalysisResult from './pages/AnalysisResult';
// import AnalysisExample from './pages/AnalysisExample';
// import LoginPage from './pages/Login';
// import HomePage from './pages/Home';

const queryClient = new QueryClient();

const router = createBrowserRouter(RouterInfo);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: '/', element: <Main /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: '/home', element: <HomePage /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: 'login', element: <LoginPage /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: 'login/oauth2/callback/kakao', element: <LoginHandler /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: 'imageupload', element: <ImageUpload /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: 'analysisresult', element: <AnalysisResult /> }],
//   },
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <p>에러</p>,
//     children: [{ index: true, path: 'analysisexample', element: <AnalysisExample /> }],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<div>에러</div>} />
    </QueryClientProvider>
  </RecoilRoot>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
