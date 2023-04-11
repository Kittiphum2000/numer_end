import { useState,useEffect } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate} from 'mathjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend , Filler} from 'chart.js';
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


const Bisection =()=>{
    const data =[];
    const [TableShow, setTableShow] = useState(null);
    const [GraphsErorr, setGraphsErorr] = useState(null);
    const [MLR, setMLR] = useState(null);
    const [Equation,setEquation] = useState("(A^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(2)

    // Get value when onChange
    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }
    const inputXL = (event) =>{
        setXL(event.target.value)
    }
    const inputXR = (event) =>{
        setXR(event.target.value)
    }

    //Cal
    const Cal = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        var new_Equation = Equation.replace(new RegExp(/[0-9*]/i, "g"), "");
        new_Equation = Equation.replace(new RegExp(new_Equation.match(/\b[a-z]\b/i)[0], "g"), "x");
        // console.log(new_Equation)
        do
        {
            xm = (xl+xr)/2.0;
            fXr = evaluate(new_Equation, {x:xr})
            fXm = evaluate(new_Equation, {x:xm})

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Er:ea
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Er:ea
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const print = () =>{
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="8%">Iteration</th>
                            <th width="23%">XL</th>
                            <th width="23%">XM</th>
                            <th width="23%">XR</th>
                            <th width="23%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
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
        const ValL = data.map((e) => { return e.Xl });
        const ValM = data.map((e) => { return e.Xm });
        const ValR = data.map((e) => { return e.Xr });
        const data_plot = {
            labels: valI,
            datasets: [
                {
                    label: "Xl",
                    data: ValL,
                    fill: true,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0)'
                },
                {
                    label: "Xm",
                    data: ValM,
                    fill: true,
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: 'rgba(0, 255, 0)'
                },
                {
                    label: "Xr",
                    data: ValR,
                    fill: true,
                    borderColor: 'rgb(0, 0, 255)',
                    backgroundColor: 'rgba(0, 0, 255)'
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
                    text: 'Bisection Xr Xm Xl',
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
                    text: 'Bisection Erorr',
                }
            },
        };
        return(
            <div>
                <Line data={data_plot} options={options}/>
            </div>
        )
    }

    const [API, setAPI] = useState({})
    async function fetchData() {
        try {
            const res = await fetch('http://localhost:8080/root');
            const data = await res.json();
            setAPI(data);
        } catch (err) {
            console.log("Error!" + err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const random = () =>{
        var num = Math.floor(Math.random() * (API.length));
        setEquation(API[num].fx)
        setXL(API[num].xl)
        setXR(API[num].xr)
    } 

    //cell cal, table, graphs
    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Cal(xlnum,xrnum);
        setTableShow(print());
        setGraphsErorr(plotEr());
        setMLR(plotMLR());
    }

    return (
        <Container>
            {/*Topic method*/}
            <div className="d-flex justify-content-center"><h1>Bisection</h1></div>     
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*All input*/}
            <Form className="d-md-flex justify-content-center">
                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input XL</Form.Label>
                    <input type="number" id="XL" value={XL} onChange={inputXL} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{margin:"0"}}>Input XR</Form.Label>
                    <input type="number" id="XR" value={XR} onChange={inputXR} style={{width:"90%", margin:"0"}} className="form-control"></input>
                </Form.Group>
            </Form>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Button and show answer*/}
            <div className="d-md-flex justify-content-center">
                <Button  className="mb-3" onClick={random} variant="secondary" style={{marginRight: 10}}>
                        Random
                </Button>
                <Button  className="mb-3" variant="dark" onClick={calculateRoot} style={{marginRight: 50}}>
                        Calculate
                </Button>
                <h3>Answer = {X.toPrecision(7)}</h3>
            </div>
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            {/*Show Calculations and Graphs*/}
            {TableShow}
            {GraphsErorr}
            {MLR}
        </Container>
    )
}

export default Bisection;