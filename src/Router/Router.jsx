/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../Components/Basic/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Basic/Footer/Footer';

const Router = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            {/* nG92J6xBIS4cGRk2  fisinoFashion */}
        </div>
    );
};

export default Router;