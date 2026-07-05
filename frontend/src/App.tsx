import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ThemeProvider } from './components/ThemeProvider';
import AuthProvider from './features/auth/context/AuthContext';
// import ProtectRoute from './components/ProtectRoute';
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';
import Verify from './pages/Verify';
import Profile from './pages/Profile';
import Post from './pages/Post';
import { PostEditorProvider } from './features/post/create-edit-post/PostEditorProvider';
import ProtectRoute from './components/ProtectRoute';
import Settings from './pages/Settings';
import Create from './pages/Create';
import ProfileTab from './features/setting/components/ProfileTab';
import PreferencesTab from './features/setting/components/PreferencesTab';
import AccountTab from './features/setting/components/AccountTab';
import PrivacyTab from './features/setting/components/PrivacyTab';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';


function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <PostEditorProvider>
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='p/:pid' element={<Post />} />
                  <Route path='/create' element={<Create />} />
                  <Route path='/edit' element={<Create />} />
                  <Route path='/explore' element={<Explore />} />

                  {/*PROTECTED ROUTES*/}
                  <Route path='/settings' element={
                    <ProtectRoute>
                      <Settings />
                    </ProtectRoute>
                  }>
                    <Route index element={<Navigate to='profile' />} />
                    <Route path='profile' element={<ProfileTab />} />
                    <Route path='preferences' element={<PreferencesTab />} />
                    <Route path='account' element={<AccountTab />} />
                    <Route path='privacy' element={<PrivacyTab />} />
                  </Route>


                  <Route path='/u' element={
                    <ProtectRoute>
                      <Profile />
                    </ProtectRoute>
                  } />

                  <Route path='/notifications' element={
                    <ProtectRoute>
                      <Notifications />
                    </ProtectRoute>
                  } />

                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/verify' element={<Verify />} />
                </Routes>
              </PostEditorProvider>
            </TooltipProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
      <Toaster
        richColors
        toastOptions={{
          classNames: {
            success:
              "bg-green-950 text-green-200 border-l-4 border-green-500 rounded-xl",

            error:
              "bg-red-950 text-red-200 border-l-4 border-red-500 rounded-xl",

            warning:
              "bg-yellow-950 text-yellow-200 border-l-4 border-yellow-500 rounded-xl",

            info:
              "bg-blue-950 text-blue-200 border-l-4 border-blue-500 rounded-xl",

            toast:
              "shadow-lg border backdrop-blur-sm",

            title: "font-semibold",

            description:
              "text-sm opacity-90",
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App

