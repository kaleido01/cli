import React, { Fragment, useState } from "react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ session, children }) => {
	const [onSide, setOnSide] = useState(false);

	return (
		<Fragment>
			<Navbar onSide={setOnSide} />

			<SideDrawer onSide={onSide} onHide={setOnSide} />

			<div className="Layout">{children}</div>
		</Fragment>
	);
};

export default Layout;
