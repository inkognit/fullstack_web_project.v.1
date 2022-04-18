import React, { FC } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
// import '../style/App.css';
import { useRouters } from './routers';


export const App: FC<{}> = () => {
  const router = useRouters()
  return (
    <Router>
      <div>
        {router}
      </div>
    </Router>
  );
}
