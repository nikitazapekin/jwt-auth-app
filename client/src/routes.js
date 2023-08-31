import React from 'react'
//import {LinksPage} from './pages/LinksPage'
import {Routes, Route} from 'react-router-dom'
//import {CreatePage} from './pages/CreatePage'
//import {DetailPage} from './pages/DetailPage'
import LinksPage from "./pages/LinksPage"
//import CreatePa
import {CreatePage} from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import AuthPage from './pages/AuthPage'
import { BrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'


export const useRoutes =isAuthenticated => {
if(isAuthenticated){
  return (

 
  <Routes>


<Route path="/links" element={   <LinksPage />} />
<Route path="/create" element={   <CreatePage />} />
<Route path="/detail/:id" element={   <DetailPage />} />

  </Routes>

  )
}
  return (

 
  <Routes>
 <Route path="/" element={   <AuthPage />} />
 {/*<Route path="*" element={<Navigate replace to="/" />} /> */}
  </Routes>

  )
//}



}





/*


import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
*/