import { useEffect, useState, useRef } from "react";
import uuid from "react-uuid";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (filter, signal) => {
    const res = await fetch("http://localhost:8081/api/employees", { signal });
    return await res.json();
};

const deleteEmployee = async (id) => {
    const res = await fetch(`http://localhost:8081/api/employees/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const filterPos = useRef(null);

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

    const handleFilter = async () => {
        try {
            const req = await fetch(
                `http://localhost:8081/api/employees/filter-position/${filterPos.current.value}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": true,
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                }
            );
            const filteredData = await req.json();
            setData(filteredData);
        } catch {}
    };

    if (loading) {
        return <Loading />;
    }

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    let positions = [];
    data.map((data) => {
        return positions.push(data.position);
    });
    const uniquePositions = positions.filter(onlyUnique);

    return (
        <>
            <select
                name="filter-level-position"
                id="filter-level-position"
                ref={filterPos}
                onChange={handleFilter}>
                <option value="selected">Filter by position</option>
                {uniquePositions.map((pos) => (
                    <option key={uuid()} value={pos}>
                        {pos}
                    </option>
                ))}
            </select>
            <EmployeeTable employees={data} onDelete={handleDelete} />
        </>
    );
};

export default EmployeeList;
