import { useState } from "react"
import Bisection from './cal/RootOfEquation/Bisection'
import FalsePosition from './cal/RootOfEquation/Falseposition'
import FixedPointInteration from './cal/RootOfEquation/FixedPoint-Interation'
import Taylor from "./cal/RootOfEquation/Taylor"
import Newton from "./cal/RootOfEquation/Newton-Rephson"
import Secant from "./cal/RootOfEquation/Secant"

import CramerRule from "./cal/LinearAlgebraicEquation/CramerRule"
import GaussElimination from "./cal/LinearAlgebraicEquation/GaussElimination"
import GaussJordan from "./cal/LinearAlgebraicEquation/GaussJordan"
import MrtrixInversion from "./cal/LinearAlgebraicEquation/MrtrixInversion"

import { Route, Routes} from 'react-router-dom'
import Navbars from "./Navbars";


function App() {
	return (
		<div className="App">
			<Navbars/>
			<Routes>
				<Route exact path="/" element={<Bisection />}/>
				<Route exact path="/Bisection" element={<Bisection/>}/>
				<Route exact path="/FalsePosition" element={<FalsePosition/>}/>
				<Route exact path="/FixedPoint-Interation" element={<FixedPointInteration/>}/>
				<Route exact path="/Taylor" element={<Taylor/>}/>
				<Route exact path="/Newton-Rephson" element={<Newton/>}/>
				<Route exact path="/Secant" element={<Secant/>}/>
				<Route exact path="/CramerRule" element={<CramerRule/>}/>
				<Route exact path="/GaussElimination" element={<GaussElimination/>}/>
				<Route exact path="/GaussJordan" element={<GaussJordan/>}/>
				<Route exact path="/MrtrixInversion" element={<MrtrixInversion/>}/>
			</Routes>
		</div>
	);
}
export default App;