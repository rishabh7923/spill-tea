import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ThemeProvider } from './components/ThemeProvider';
import AuthProvider from './features/auth/AuthContext';
// import ProtectRoute from './components/ProtectRoute';
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';
import Verify from './pages/Verify';
import Profile from './pages/Profile';
import PostPage from './pages/PostPage';
import { PostEditorProvider } from './features/post/create-edit-post/PostEditorProvider';


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
                  <Route path='/u' element={<Profile />} />

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
      <Toaster />
    </BrowserRouter>
  )
}

export default App
