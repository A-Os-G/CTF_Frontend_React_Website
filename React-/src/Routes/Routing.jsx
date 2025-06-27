import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/user/homePage/index'
import ChallengePage from '../pages/user/challengePage/index'
import SignupPage from '../pages/user/accessPage/signupPage/Signup';
import LoginPage from '../pages/user/accessPage/loginPage/Login';
import EditProfilePage from '../pages/user/profilePage/index';
import AdminPage from '../pages/admin/welcomePage/index'
import UsersSubPage from '../pages/admin/usersSubPage/index';
import ChallengesSubPage from '../pages/admin/challengesSubPage/index';
import CategorySubPage from '../pages/admin/categorySubPage/index';
import FeedbackSubPage from '../pages/admin/feedbackSubPage/index';


const Routing = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/challenge" element={<ChallengePage/>} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/profile' element={<EditProfilePage />} />
        <Route path='/admin/users' element={<UsersSubPage />} />
        <Route path='/admin/challenges' element={<ChallengesSubPage />} />
        <Route path='/admin/category' element={<CategorySubPage />} />
        <Route path='/admin/feedback' element={<FeedbackSubPage />} />
      </Routes>
    </>
    
  )
}

export default Routing