import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//pages
import HomePage from "../views/HomePage/HomePage";
import DetailPage from "../views/DetailsPage/DetailPage";

//components
import Loader from "../components/Loader/Loader";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="character/:id" element={<DetailPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
