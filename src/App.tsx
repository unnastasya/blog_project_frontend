import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { FullPost } from "./pages/FullPost/FullPost";
import { AddPost } from "./pages/AddPost/AddPost";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";

import { Route, Routes } from "react-router";
import { useAppDispatch } from "./store";
import { AuthActions } from "./store/auth";
import { Page } from "./components/Page/Page";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(AuthActions.requestAuthMe());
	});
	return (
		<div className="page">
            
            <Routes>
           
			<Route path="/" element={<Page />}>
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
