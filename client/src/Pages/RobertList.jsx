import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (signal) => {
    const res = await fetch("http://localhost:8081/api/employees/robert", { signal });
    return await res.json();
};

const deleteEmployee = async (id) => {
    const res = await fetch(`http://localhost:8081/api/employees/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

const RobertList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const handleDelete = (id) => {
        deleteEmployee(id).catch((err) => {
            console.log(err);
        });

        setData((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        const controller = new AbortController();

        fetchEmployees(controller.signal)
            .then((employees) => {
                setLoading(false);
                setData(employees);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setData(null);
                    throw error;
                }
            });

        return () => controller.abort();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <EmployeeTable employees={data} onDelete={handleDelete} />;
};

export default RobertList;
