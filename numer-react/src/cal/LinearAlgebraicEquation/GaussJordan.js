import { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, det, transpose } from 'mathjs'

const GaussJordan = () => {

    const [size, setSize] = useState(3);
    const [matrix, setMatrix] = useState([[2, 3, 5], [3, 1, -2], [1, 3, 4]]);
    const [B, setB] = useState([0, -2, 3]);
    const [TableShow, setTableShow] = useState(null);

    //Input matrix size.
    const inputSize = (event) => {
        var newSize = parseInt(event.target.value) % 10;  //ทำให้เป็นเลขหลักเดียว

        if (newSize < 2) {                                //ต่ำกว่า 2 ให้เป็น 2
            newSize = parseInt(2)
        }
        event.target.value = newSize;

        setSize(newSize)
        setMatrix(Array(newSize).fill().map(() => Array(newSize).fill(0)));
        setB(Array(newSize).fill(0));
    }

    // Matrix
    const matrixInput = (
        <Form style={{ margin: "10px", padding: "10px" }}>
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
        // console.log(matrix);
    };

    // X
    const X_Input = (
        <div className="border border-3 border-dark border-top-0 border-bottom-0"
            style={{ margin: "10px", padding: "13px" }}>
            {B.map((row, i) => (
                <h3 key={`X-${i}`}>
                    X{i}
                </h3>
            ))}
        </div>
    )

    // B
    const B_Input = (
        <Form style={{ margin: "10px", padding: "10px" }}>
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
        var XN = matrix;
        var obj = {};
        for (var a = 0; a < size - 1; a++) {
            for (var i = a + 1; i < size; i++) {
                var m = XN[i][a];
                for (var col = a; col < size; col++) {
                    XN[i][col] = XN[i][col] - (XN[a][col] / XN[a][a]) * m;
                }
                B[i] = B[i] - (B[a] / XN[a][a]) * m;
            }
        }
        for (var i = size - 1; i > 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
                var m = XN[j][i] / XN[i][i];
                for (var col = i; col < size; col++) {
                    XN[j][col] = XN[j][col] - m * XN[i][col];
                }
                B[j] = B[j] - m * B[i];
            }
        }
        for (var i = 0; i < size; i++) {
            var m = XN[i][i];
            for (var a = size - 1; a >= 0; a--) {
                XN[i][a] = XN[i][a] / m;
            }
            B[i] = B[i] / m;
        }
    }

    const print = () =>{
        return(
            <>
                {B.map((b, i) => (
                    <h5 key={i}>X{i} = {b}</h5>
                ))}
            </>
        );
    }

    const calculateRoot = () => {
        cal();
        setTableShow(print());
    }

    return (
        <Container>
            {/*Topic method*/}
            <div className="d-flex justify-content-center"><h1>Gauss Jordan</h1></div><br />
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

export default GaussJordan;