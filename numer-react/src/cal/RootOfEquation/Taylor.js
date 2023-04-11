import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative, factorial} from 'mathjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Taylor =()=>{
    const data =[];
    const [TableShow, setTableShow] = useState(null);
    const [GraphsErorr, setGraphsErorr] = useState(null);
    const [MLR, setMLR] = useState(null);
    const [Equation,setEquation] = useState("x^5")
    const [N,setN] = useState(5)
    const [X,setX] = useState(4)
    const [X0,setX0] = useState(1)
    const [Ans,setAns] = useState(0)

    // Get value when onChange
    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }
    const inputN = (event) =>{
        setN(event.target.value)
    }
    const inputX = (event) =>{
        setX(event.target.value)
    }
    const inputX0 = (event) =>{
        setX0(event.target.value)
    }

    //Cal
    const Cal= (n, x0, x) => {
        var new_Equation = Equation.replace(new RegExp(/[0-9*]/i, "g"), "");
        new_Equation = Equation.replace(new RegExp(new_Equation.match(/\b[a-z]\b/i)[0], "g"), "x");
        console.log(new_Equation)

        var ans = evaluate(new_Equation, {x:X})
        var val = 0

        val = val + Math.pow((x-x0), 0)/factorial(0)*evaluate(new_Equation, {x:x0})
        var ea = error(val, ans)
        var obj = {
            iteration:0,
            X:val,
            Er:ea
        }
        data.push(obj)
        var derivative_Equation = derivative(new_Equation, 'x')

        for(let i=1; i<=n; i++){
            val = val + Math.pow((x-x0), i)/factorial(i)*evaluate(derivative_Equation.toString(), {x:x0})
            ea = error(val, ans)
            obj = {
                iteration:i,
                X:val,
                Er:ea
            }
            data.push(obj)
            derivative_Equation = derivative(derivative_Equation.toString(), 'x')
        }
        setAns(val)
    }
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const print = () =>{
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="30%">Iteration</th>
                            <th width="35%">X</th>
                            <th width="35%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X}</td>
                                <td>{element.Er}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const plotMLR = () =>{
        const valI = data.map((x) => { return x.iteration });
        const ValX = data.map((x) => { return x.X });
        const data_plot = {
            labels: valI,
            datasets: [
                {
                    label: "X",
                    data: ValX,
                    fill: true,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0)'
                },
            ]
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Val X',
                }
            },
        };
        return(
            <div>
                <Line data={data_plot} options={options}/>
            </div>
        )
    }
    const plotEr = () =>{
        const valueIter = data.map((x) => { return x.iteration });
        const valueEr = data.map((x) => { return x.Er });
        const data_plot = {
            labels: valueIter,
            datasets: [
                {
                    label: "Erorr",
                    data: valueEr,
                    fill: true,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0)'
                },
            ]
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' 
                },
                title: {
                    display: true,
                    text: 'Taylor Erorr',
                }
            },
        };
        return(
            <div>
                <Line data={data_plot} options={options}/>
            </div>
        )
    }

    //cell cal, table, graphs
    const calculateRoot = () =>{
        const x = parseFloat(X)
        const x0 = parseFloat(X0)
        const n = parseFloat(N)
        Cal(n, x0, x);

        setTableShow(print());
        setGraphsErorr(plotEr());
        setMLR(plotMLR());
    }

    return (
        <Container>
            {/*Topic method*/}
            <div className="d-flex justify-content-center"><h1>Talor</h1></div>     
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*All input*/}
            <Form className="d-md-flex justify-content-center">
                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input X</Form.Label>
                    <input type="number" id="X" value={X} onChange={inputX} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input X0</Form.Label>
                    <input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input N</Form.Label>
                    <input type="number" id="N" value={N} onChange={inputN} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>
            </Form>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Button and show answer*/}
            <div className="d-md-flex justify-content-center">
                <Button  className="mb-3" variant="dark" onClick={calculateRoot}style={{marginRight: 50}}>
                        Calculate
                </Button>
                <h3>Answer = {Ans.toPrecision(7)}</h3>
            </div>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Show Calculations and Graphs*/}
            {TableShow}
            {GraphsErorr}
            {MLR}
        </Container>
    )
}

export default Taylor;