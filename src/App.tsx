import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import { FullPost } from "./pages/FullPost";
import { AddPost } from "./pages/AddPost/AddPost";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";

import { Route, Routes } from "react-router";
import { useAppDispatch, useAppSelector } from "./store";
import { AuthActions, isAuthUserSelector } from "./store/auth";
import { Page } from "./components/Page/Page";

function App() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);

	useEffect(() => {
		dispatch(AuthActions.requestAuthMe());
	});
	return (
		<div className="page">
            
            <Routes>
           
			<Route path="/" element={<Page children />}>
				<Route index element={<Home />}></Route>
				<Route path="/posts/:id" element={<FullPost />} />
				<Route path="/posts/:id/edit" element={<AddPost />} />
				<Route path="/add-post" element={<AddPost />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />
			</Route>
            
            </Routes>
            

			{/* <Header />
			<Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/posts/:id" element={<FullPost />}/>
                    <Route path="/posts/:id/edit" element={<AddPost />}/>
                    <Route path="/add-post" element={<AddPost />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Registration />}/>
                </Routes>
			</Container> */}
		</div>
	);
}

export default App;
