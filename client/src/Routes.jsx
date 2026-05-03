import { useEffect } from 'react';

import {useNavigate, useRoutes} from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/profile';
import Landing from './components/LandingPage/Landing';
import { useAuth } from './AuthContext';

const ProjectRoutes=()=>{
    const {currentUser,setCurrentUser}=useAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        const userIdFromStorage=localStorage.getItem("userId");
        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage && !['/','/auth','/signup'].includes(window.location.pathname)){
            navigate('/auth');
        }
        if(userIdFromStorage && window.location.pathname === '/auth'){
            navigate('/dashboard');
        }
    },[window.location.pathname,currentUser,navigate,setCurrentUser]);

    let routes=useRoutes([

        {
            path:'/',
            element: <Landing />

        },
        {
            path:'/dashboard',
            element: currentUser ? <Dashboard /> : <Login />
        },
        {
            path:'/auth',
            element: <Login />
        },
        {
            path:'/signup',
            element: <Signup />
        },  
        {
            path:'/profile',
            element: currentUser ? <Profile /> : <Login />
        }
    ]);

    return routes;
}

export default ProjectRoutes;