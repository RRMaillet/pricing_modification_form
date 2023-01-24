import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Fragment } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { LogInButton } from '../../buttons/login-button/login-button.component';
import { LogOutButton } from '../../buttons/logout-button/logout-button.component';

import './navigation.component.scss';

function Navi({ isAdmin }) {
	const isAuthenticated = useIsAuthenticated();

	return (
		<Fragment>
			<Navbar variant="dark" bg="dark">
				<Container>
					<Navbar.Brand href="/">
						Intranet DEV
					</Navbar.Brand>
					<AuthenticatedTemplate>
						<Nav className="me-auto">
							
							<NavDropdown title="Pricing" id="pricing-dropdown">
								<NavDropdown.Item href="/pricing_req">Program Pricing</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</AuthenticatedTemplate>
				</Container>
				<Container>
					<Nav className="ms-auto justify-content-end">
						{isAuthenticated ? (
							<Fragment>
								{isAdmin ? <Nav.Link href="/admin">Admin</Nav.Link> : ' '}
								<LogOutButton />
							</Fragment>
						) : (
							<LogInButton />
						)}
					</Nav>
				</Container>
			</Navbar>
		</Fragment>
	);
}

export default Navi;
