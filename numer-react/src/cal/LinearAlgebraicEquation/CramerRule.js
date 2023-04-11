import { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, det , transpose} from 'mathjs'

const CramerRule = () => {

    const [size, setSize] = useState(2);
    const [matrix, setMatrix] = useState([[0,0],[0,0]]);
    const [B, setB] = useState([0,0]);
    const [TableShow, setTableShow] = useState(null);
    const data =[];

    //Input matrix size.
    const inputSize = (event) => {
        var newSize = parseInt(event.target.value)%10;  //ทำให้เป็นเลขหลักเดียว

        if(newSize < 2){                                //ต่ำกว่า 2 ให้เป็น 2
            newSize = parseInt(2)
        }
        event.target.value = newSize;

        setSize(newSize)
        setMatrix(Array(newSize).fill().map(() => Array(newSize).fill(0)));
        setB(Array(newSize).fill(0));
    }

    // Matrix
    const matrixInput = (
        <Form style={{ margin: "10px", padding: "10px"}}>
            {matrix.map((row, i) => (
                <Form.Group key={`row-${i}`} className="border border-3 border-dark border-top-0 border-bottom-0 d-md-flex justify-content-center">
                    {row.map((value, j) => (
                        <input
                            type="number"
                            key={`row-${i}-col-${j}`}
                            defaultValue={value}
                            onChange={(event) => MatrixChange(event, i, j)}
                            style={{ width: "80px", margin: "4px" }}
                            className="form-control"
                        />
                    ))}
                </Form.Group>
            ))}
        </Form>
    );
    const MatrixChange = (event, i, j) => {
        matrix[i][j] = parseInt(event.target.value);
        console.log(matrix);
    };
    
    // X
    const X_Input = (
        <div className="border border-3 border-dark border-top-0 border-bottom-0"  
        style={{ margin: "10px", padding: "13px"}}>
            {B.map((row, i) => (
                <h3  key={`X-${i}`}>
                    X{i}
                </h3>
            ))}
        </div>
    )

    // B
    const B_Input = (
        <Form style={{ margin: "10px", padding: "10px"}}>
            <Form.Group>
                {B.map((row, i) => (
                    <input
                        type="number"
                        key={`B-${i}`}
                        defaultValue={B[i]}
                        onChange={(event) => Bchange(event, i)}
                        style={{ width: "80px", margin: "4px" }}
                        className="form-control"
                    />
                ))}
            </Form.Group>
        </Form>
    )
    const Bchange = (event, i) => {
        B[i] = parseInt(event.target.value);
    };

    // Cal
    const cal = () => {
        var XN;
        var obj={};
        for(var i=0; i<size; i++){
            XN = transpose(matrix);
            XN[i] = B;
            XN = transpose(XN);
            console.log(XN)
            obj = {
                iteration:i,
                DetXn:det(XN),
                Ans:det(XN)/det(matrix),
                XN:XN,
            }
            data.push(obj)
        }
    }

    
    const MatrixTable = ({ matrix }) => {
        return (
        <>
            <div className="border border-2 p-2 border-top-0 border-bottom-0">
                {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="d-flex">
                    {row.map((cell, cellIndex) => (
                    <div key={cellIndex} style={{marginInline: "5px"}}>{cell}</div>
                    ))}
                </div>
                ))}
            </div>
        </>
        );
      };

    const print = () =>{
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>X</th>
                            <th>Det( Xn )</th>
                            <th>Det( X )</th>
                            <th>Det( X )/Det( Xn )</th>
                            <th>Ans</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>(
                            <tr className="text-center " key={index}>

                                <td>
                                    <div className="d-md-flex justify-content-center align-items-center"  >
                                    <h3>X</h3>{element.iteration}
                                    </div>
                                </td>

                                <td>
                                    <div className="d-md-flex justify-content-start align-items-center">
                                    <MatrixTable matrix={element.XN}/> 
                                    <h2 style={{marginLeft: "20px" }}>=</h2>
                                    <h4 style={{marginLeft: "10px" }}>{element.DetXn}</h4>
                                    </div>
                                </td>

                                <td>
                                    <div className="d-md-flex justify-content-start align-items-center">
                                    <MatrixTable matrix={matrix}/> 
                                    <h2 style={{marginLeft: "20px" }}>=</h2>
                                    <h4 style={{marginLeft: "10px" }}>{det(matrix)}</h4>
                                    </div>
                                </td>

                                <td>
                                    <h4 style={{marginLeft: "10px" }}>{det(element.DetXn)} / {det(matrix)}</h4>
                                </td>

                                <td>{element.Ans}</td>

                            </tr>)
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const calculateRoot = () =>{
        cal()
        setTableShow(print());
    }

    return (
        <Container>
            {/*Topic method*/}
            <div className="d-flex justify-content-center"><h1>Gauss Elimination</h1></div><br />
            {/*------------------------------------------------------------------------------------------------------------------------------*/}

            <center>
                <div className="d-flex flex-column justify-content-center">
                    <Form.Group>
                        <Form.Label>Enter matrix size(N x N)</Form.Label>
                        <input type="number" id="dimension" defaultValue={size} onChange={inputSize} style={{ width: "60px", margin: "0" }} className="form-control" max="9" min="2" step="1"></input>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ marginTop: "20px" }}>Enter matrix values</Form.Label>
                        <div className="d-md-flex justify-content-center align-items-center">
                            {matrixInput}
                            {X_Input}
                            <h1>=</h1>
                            {B_Input}
                        </div>
                    </Form.Group>
                </div>
                <br />
                <Button className="mb-3" variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                {TableShow}
            </center>

        </Container>
    )
}

export default CramerRule;