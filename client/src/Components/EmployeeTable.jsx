import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import uuid from 'react-uuid'
import "./EmployeeTable.css";

const fetchColors = async () => {
    const res = await fetch(`http://localhost:8080/api/colors`);
    return await res.json();
};

const EmployeeTable = ({ employees, onDelete, isCheck }) => {
    const [ checked, setChecked ] = useState([])
    const [ colors, setColors ] = useState([])
    const checkbox = useRef(null)
    

    const findColor = (id) => {
        const result = colors.find(e => e._id === id)
        if(result) {
            return result.name
        }
    }
    useEffect(() => {

        fetchColors()
            .then((colors) => {
                setColors(colors)
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setColors(null);
                    throw error;
                }
            });
    }, []);
    return (
            <div className="EmployeeTable">
                <table key={uuid()}>
                    <thead key={uuid()}>
                        <tr key={uuid()}>
                            <th key={uuid()}>Name</th>
                            <th key={uuid()}>Level</th>
                            <th key={uuid()}>Position</th>
                            <th key={uuid()}>Favourite Color</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody key={uuid()}>
                        {employees && employees.map((employee) => (
                            <>
                                <tr key={employee._id}>
                                    <td key={uuid()}>{employee.name}</td>
                                    <td key={uuid()}>{employee.level}</td>
                                    <td key={uuid()}>{employee.position}</td>
                                    <td key={uuid()}>{findColor(employee.favColor)}</td>
                                    <td key={uuid()}>
                                        <Link to={`/update/${employee._id}`}>
                                            <button key={uuid()} type="button">Update</button>
                                        </Link>
                                        <button
                                            key={uuid()}
                                            type="button"
                                            onClick={() => onDelete(employee._id)}>
                                            Delete
                                        </button>
                                    </td>
                                    <td key={uuid()}>
                                        {isCheck && <input 
                                                        key={employee._id}
                                                        type="checkbox" 
                                                        ref={checkbox}
                                                        onClick={() => setChecked(prevValue => prevValue + '"' + employee._id + '",')}
                                                    />
                                        }
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default EmployeeTable;
