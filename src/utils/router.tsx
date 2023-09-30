import App from '@src/App';
import MainPage from '@src/pages/Main/index';
import HomePage from '@src/pages/Home/index';
import LoginPage from '@src/pages/Login/index';
import ImageUploadPage from '@src/pages/ImageUpload/index';
import AnalysisExamplePage from '@src/pages/AnalysisExample/index';
import AnalysisResultPage from '@src/pages/AnalysisResult/index';
import AuthRoutes from '@src/components/AuthRoutes';
import NotAuthRoutes from '@src/components/NotAuthRoutes';
import LoginHandler from '@src/pages/LoginHandler';
import JoinPage from '@src/pages/Join';

export const RouterInfo = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        element: <AuthRoutes />,
        children: [
          {
            path: '/analysisresult',
            element: <AnalysisResultPage />,
          },
        ],
      },
      {
        element: <NotAuthRoutes />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/login/oauth2/callback/:kakaotoken',
            element: <LoginHandler />,
          },
          {
            path: '/join',
            element: <JoinPage />,
          },
        ],
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/imageupload',
        element: <ImageUploadPage />,
      },
      {
        path: '/analysisexample',
        element: <AnalysisExamplePage />,
      },
    ],
  },
];
