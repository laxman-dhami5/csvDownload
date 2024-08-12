import React, { useState, useRef } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

const ExpenseForm = () => {
    const [entries, setEntries] = useState([]);
    const moneyRef = useRef();
    const descriptionRef = useRef();
    const catogaryRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredMoney = moneyRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredCatogary = catogaryRef.current.value;

        // Add new entry to the list
        setEntries((prevEntries) => [
            ...prevEntries,
            {
                money: enteredMoney,
                description: enteredDescription,
                category: enteredCatogary,
            },
        ]);

        // Clear form fields
        moneyRef.current.value = "";
        descriptionRef.current.value = "";
        catogaryRef.current.value = "";
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 style={{ color: "blueviolet", textAlign: "center" }}>
                        Daily Expenses
                    </h2>
                    <Form onSubmit={submitHandler} style={{ backgroundColor: "gray" }}>
                        <Form.Group>
                            <Form.Label>Money Spent</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" ref={moneyRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" ref={descriptionRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" ref={catogaryRef}>
                                <option value="food">Food</option>
                                <option value="petrol">Petrol</option>
                                <option value="salary">Salary</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    {entries.length > 0 && (
                        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f8f9fa" }}>
                            <h4>Submitted Data:</h4>
                            <ul>
                                {entries.map((entry, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>
                                        {entry.money}-{entry.description}-{entry.category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ExpenseForm;
