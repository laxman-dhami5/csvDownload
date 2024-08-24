import React, { useRef, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, setItems, removeExpense } from "../store/expensesSlice";
import { selectTotalExpenses } from "../store/expensesSlice";

const ExpenseForm = () => {
    const entries = useSelector((state) => state.expenses.items || []);
    const dispatch = useDispatch();
    const moneyRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const totalExpenses = useSelector(selectTotalExpenses);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("https://expensetracker-875ce-default-rtdb.firebaseio.com/expenses.json", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses.");
                }
                const data = await response.json();
                const loadedEntries = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                dispatch(setItems(loadedEntries));
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredMoney = moneyRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        if (editingId) {
            // PUT request to update an existing expense
            try {
                const response = await fetch(`https://expensetracker-875ce-default-rtdb.firebaseio.com/expenses/${editingId}.json`, {
                    method: "PUT",
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
                    throw new Error("Failed to update expense.");
                }

                // Update the expense in the Redux store
                dispatch(removeExpense(editingId)); // Remove old expense
                dispatch(addExpense({
                    id: editingId,
                    money: enteredMoney,
                    description: enteredDescription,
                    category: enteredCategory,
                }));
                

                // Reset form and editing state
                setEditingId(null);
                moneyRef.current.value = "";
                descriptionRef.current.value = "";
                categoryRef.current.value = "";
                alert('updated')
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            // POST request to add a new expense
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

                const data = await response.json();

                // Add the new expense to the Redux store
                dispatch(addExpense({
                    id: data.name,
                    money: enteredMoney,
                    description: enteredDescription,
                    category: enteredCategory,
                }));

                // Reset form
                moneyRef.current.value = "";
                descriptionRef.current.value = "";
                categoryRef.current.value = "";
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`https://expensetracker-875ce-default-rtdb.firebaseio.com/expenses/${id}.json`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete expense.");
            }

            dispatch(removeExpense(id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const editHandler = (entry) => {
        moneyRef.current.value = entry.money;
        descriptionRef.current.value = entry.description;
        categoryRef.current.value = entry.category;
        setEditingId(entry.id);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4}>
                    <h2 style={{ color: "white", textAlign: "center" }}>
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

                        <Button variant="primary" type="submit" style={{ margin: '2rem' }}>
                            {editingId ? 'Update' : 'Submit'}
                        </Button>
                        {totalExpenses > 10000 && <Button variant="danger">Premium</Button>}
                    </Form>

                    {entries.length > 0 && (
                        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "yellow" }}>
                            <h4>Expense Details:</h4>
                            <ul>
                                {entries.map((entry) => (
                                    <li key={entry.id} style={{ marginBottom: "10px" }}>
                                        {entry.money} - {entry.description} - {entry.category}
                                        <Button className="ms-2" type="button" variant="danger" onClick={() => deleteHandler(entry.id)}>Delete</Button>
                                        <Button className="ms-2" type="button" variant="secondary" onClick={() => editHandler(entry)}>Edit</Button>
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
