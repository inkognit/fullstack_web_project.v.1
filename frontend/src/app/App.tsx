import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from '../components/header';
import { useRouters } from './routers';


export const App: FC<{}> = () => {
  const [is_auth, setIsAuth] = useState(false)

  const auth = useCallback(
    async () => {
      const access_token = localStorage.getItem("auth_token")
      setIsAuth(access_token ? true : false)

      console.log(access_token)
      const request = await fetch('', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token })
      })
      const responce = await request.json()
      console.log("res: ", responce)
      const new_access_token = responce.access_token
      if (new_access_token) {
        localStorage.setItem("auth_token", new_access_token)
      } else {
        localStorage.removeItem("auth_token")
      }
      console.log("new_access_token: ", new_access_token)
    }, []
  )

  useEffect(() => {
    auth()
  })

  const router = useRouters(is_auth)
  return (
    <Router>
      <Header is_auth={!is_auth} />
      <div>
        {router}
      </div>
    </Router>
  );
}
