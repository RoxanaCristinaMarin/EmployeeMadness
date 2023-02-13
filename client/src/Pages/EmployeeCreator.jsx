import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = async (employee) => {
    const res = await fetch("http://localhost:8081/api/employees", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(employee),
    });
    return await res.json();
};

const EmployeeCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateEmployee = (employee) => {
        setLoading(true);

        createEmployee(employee)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <EmployeeForm
            onCancel={() => navigate("/")}
            disabled={loading}
            onSave={handleCreateEmployee}
        />
    );
};

export default EmployeeCreator;
