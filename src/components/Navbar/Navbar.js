import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Button, Responsive } from "semantic-ui-react";

import Signout from "../Auth/Signout";
import { UserContext } from "./../../index";

const Navbar = ({ onSide }) => {
	const currentUser = useContext(UserContext);

	return currentUser ? (
		<AuthNav onSide={onSide} />
	) : (
		<UnAuthNav onSide={onSide} />
	);
};

const AuthNav = ({ onSide }) => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habits" />
				<Menu.Item link as={NavLink} to="/myhabits" name="myhabits" />
				<Menu.Item link as={NavLink} to="/newhabit" name="newHabit" />
				<Menu.Item link as={NavLink} to="/profile" name="profile" />
				<Menu.Item>
					<Signout />
				</Menu.Item>
			</Responsive>
			<Responsive
				as={Menu.Item}
				position="right"
				icon="bars"
				onClick={() => onSide(true)}
				{...Responsive.onlyMobile}
			/>
		</Menu>
	);
};

const UnAuthNav = ({ onSide }) => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habit" />
				<Menu.Item link as={NavLink} to="/profile" name="profile" />
				<Menu.Item>
					<Button as={Link} to="/signin" inverted>
						Signin
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Button as={Link} to="/signup" inverted>
						Signup
					</Button>
				</Menu.Item>
			</Responsive>
			<Responsive
				as={Menu.Item}
				position="right"
				icon="bars"
				onClick={() => onSide(true)}
				{...Responsive.onlyMobile}
			/>
		</Menu>
	);
};
export default Navbar;
