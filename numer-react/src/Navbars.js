import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react"
import { size } from 'mathjs';

function OffcanvasExample() {
	return (
		<Navbar bg="dark" expand='false' className="mb-3" variant="dark">
			<Container fluid>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-false`}
					aria-labelledby={`offcanvasNavbarLabel-expand-false`}
					placement="start"
				>

					<Offcanvas.Header closeButton>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
							Methods
						</Offcanvas.Title>
					</Offcanvas.Header>

					<Offcanvas.Body >
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<NavDropdown title="Root of Equation" id={`offcanvasNavbarDropdown-expand-false`}>
								<NavDropdown.Item href="Bisection">1. Bisection Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="Falseposition">2. Falseposition Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="FixedPoint-Interation">3. Fixed-point iteration Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="Taylor">4. Talor Series Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="Newton-Rephson">5. Newton Raphson</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="Secant">6. Secant Method</NavDropdown.Item>
							</NavDropdown>

							<NavDropdown title="Linear Algebraic Equation" id={`offcanvasNavbarDropdown-expand-false`}>
								<NavDropdown.Item href="CramerRule">1. Cramer's Rule</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="GaussElimination">2. Gauss Elimination Method**</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="GaussJordan">3. Gauss Jordan Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="MrtrixInversion">4. Matrix Inversion Method</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="">5. LU Decomposition Method**</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="">6. Cholesky Decomposition Method**</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="">7. Jacobi iteration Method**</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="">8. Gauss Seidel iteration Method**</NavDropdown.Item> <NavDropdown.Divider />
								<NavDropdown.Item href="">9. Conjugate Gradient Method**</NavDropdown.Item>

							</NavDropdown>
						</Nav>
					</Offcanvas.Body>

				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}

export default OffcanvasExample;