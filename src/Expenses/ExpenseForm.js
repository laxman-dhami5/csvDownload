import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

const ExpenseForm = () => {
    const [entries, setEntries] = useState([]);
    const moneyRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("https://expensetracker-875ce-default-rtdb.firebaseio.com/expenses.json",{
                    method:"GET",

                });
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses.");
                }
                const data = await response.json();

               
                const loadedEntries = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                

                setEntries(loadedEntries);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchExpenses();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredMoney = moneyRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        try {
            const response = await fetch("https://expensetracker-875ce-default-rtdb.firebaseio.com/expenses.json", {
                method: "POST",
                body: JSON.stringify({
                    money: enteredMoney,
                    description: enteredDescription,
                    category: enteredCategory,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to add expense.");
            }

            
            setEntries((prevEntries) => [
                ...prevEntries,
                {
                    money: enteredMoney,
                    description: enteredDescription,
                    category: enteredCategory,
                },
            ]);

           
            moneyRef.current.value = "";
            descriptionRef.current.value = "";
            categoryRef.current.value = "";
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4}>
                    <h2 style={{ color: "blueviolet", textAlign: "center" }}>
                        Daily Expenses
                    </h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Money Spent</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" ref={moneyRef} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" ref={descriptionRef} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" ref={categoryRef} required>
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
                        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "yellow" }}>
                            <h4>Expense Details:</h4>
                            <ul>
                                {entries.map((entry, index) => (
                                    <li key={entry.id} style={{ marginBottom: "10px" }}>
                                        {entry.money} - {entry.description} - {entry.category}
                                        
                                        <Button className="ms-2" type="button" variant="danger">Delete</Button>
                                        <Button className="ms-2" type="button" variant="info">Edit</Button>
                                      
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
