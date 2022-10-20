import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomeCompnent from '../pages/Home'; 

export default function MainRouting() {
  return (
 <>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeCompnent  />} />
        </Routes>
      </BrowserRouter>
      </>
  )
}
