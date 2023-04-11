import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate} from 'mathjs'
import { Line } from 'react-chartjs-2';

const Secant=()=>{
    const data =[];
    const [TableShow, setTableShow] = useState(null);
    const [GraphsErorr, setGraphsErorr] = useState(null);
    const [Xnew_Xold, setXnew_Xold] = useState(null);
    const [Equation,setEquation] = useState("2A^3-2A")
    const [X,setX] = useState(0)
    const [Initial_value,setInitial_value] = useState(2)


    // Get value when onChange
    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }
    const inputInitial_value = (event) =>{
        setInitial_value(event.target.value)
    }

    //Cal
    const Cal = (x1) => {
        var iter = 0;
        var MAX = 20;
        const e = 0.00001;
        var obj={};

        var new_Equation = Equation.replace(new RegExp(/[0-9*]/i, "g"), "");
        new_Equation = Equation.replace(new RegExp(new_Equation.match(/\b[a-z]\b/i)[0], "g"), "x");
        console.log(new_Equation)

        var x0=evaluate(new_Equation, {x:x1}), ea, x11;
        do
        {
            iter ++;
            x11 = x1
            x1 = x0
            x0 = x1-evaluate(new_Equation, {x:x1})*(x11-x1)/(evaluate(new_Equation, {x:x11})-evaluate(new_Equation, {x:x1}))
            ea = error(x0, x1);
            obj = {
                iteration:iter,
                X0:x0,
                X1:x1,
                Er:ea
            }
            data.push(obj)
        }while(ea>e && iter<MAX)
        setX(x0)
    }
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const print = () =>{
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="40%">X0</th>
                            <th width="40%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.Er}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const plotXnew_Xold = () =>{
        const valI = data.map((x) => { return x.iteration });
        const ValX0 = data.map((x) => { return x.X0 });
        const ValX1 = data.map((x) => { return x.X1 });
        var name = Equation.match(/[a-z]/i)[0];
        const data_plot = {
            labels: valI,
            datasets: [
                {
                    label: name,
                    data: ValX1,
                    fill: true,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0)'
                },
                // {
                //     label: "Xold",
                //     data: ValX1,
                //     fill: true,
                //     borderColor: 'rgb(0, 255, 0)',
                //     backgroundColor: 'rgba(0, 255, 0)'
                // },
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
                    text: 'Val '+name,
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
                    text: 'Secant Erorr',
                }
            },
        };
        return(
            <div>
                <Line data={data_plot} options={options}/>
            </div>
        )
    }

    // //cell cal, table, graphs
    const calculateRoot = () =>{
        const x0 = parseFloat(Initial_value)
        Cal(x0);
        setTableShow(print());
        setGraphsErorr(plotEr());
        setXnew_Xold(plotXnew_Xold());
    }

    return (
        <Container>
            {/*Topic method*/}
            <div className="d-flex justify-content-center"><h1>Secant</h1></div>     
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*All input*/}
            <Form className="d-md-flex justify-content-center">
                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>initial value</Form.Label>
                    <input type="number" id="XL" value={Initial_value} onChange={inputInitial_value} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

            </Form>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Button and show answer*/}
            <div className="d-md-flex justify-content-center">
                <Button  className="mb-3" variant="dark" onClick={calculateRoot} style={{marginRight: 50}}>
                        Calculate
                </Button>
                <h3>Answer = {X.toPrecision(7)}</h3>
            </div>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Show Calculations and Graphs*/}
            {TableShow}
            {GraphsErorr}
            {Xnew_Xold}
        </Container>
    )
}

export default Secant;