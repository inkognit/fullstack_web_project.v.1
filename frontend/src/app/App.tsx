import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from '../components/header';
import { useHTTP } from './http.hook';
// import '../style/App.css';
import { useRouters } from './routers';


export const App: FC<{}> = () => {
  const [is_auth, setIsAuth] = useState(false)
  const { request } = useHTTP()
  const auth = useCallback(
    async () => {
      const access_token = localStorage.getItem("auth_token")
      setIsAuth(access_token ? true : false)
      await request('/', 'POST', { access_token })

    }, [request]
  )

  useEffect(() => {
    auth()
  })

  const router = useRouters(is_auth)
  return (
    <Router>
      <Header />
      <div>
        {router}
      </div>
    </Router>
  );
}
