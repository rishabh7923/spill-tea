import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PostPage from './pages/PostPage';
import { PostEditorProvider } from './features/post/create-edit-post/PostEditorProvider';
import ProtectRoute from './components/ProtectRoute';


function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <PostEditorProvider>
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='p/:pid' element={<PostPage />} />
                  {/*ROUTE TO BE PROTECT*/}
                  <Route path='/u' element={
                    <ProtectRoute>
                      <Profile />
                    </ProtectRoute>
                  } />

                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/verify' element={<Verify />} />
                </Routes>
              </PostEditorProvider>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
