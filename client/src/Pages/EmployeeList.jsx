import { useEffect, useState, useRef } from "react";
import uuid from 'react-uuid';
import axios from 'axios'
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch(`/api/employees`, { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
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
    try{
      const filteredData = await axios.get(`https://localhost:8080/api/employees/filter-position/${filterPos.current.value}`, {
        headers: {
          'Access-Control-Allow-Origin': true
        },
        mode: 'cors'
      })
      setData(filteredData)
    }catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Loading />;
  }
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  let positions = [];
  data.map((data) => {
    return positions.push(data.position)
  })
  const uniquePositions = positions.filter(onlyUnique)

  return (
    <>
      <select 
        name="filter-level-position" 
        id="filter-level-position"
        ref={filterPos}
        onChange={handleFilter}
      >
        <option value='selected'>Filter by position</option>
        {uniquePositions.map((pos) => {
          return <option key={uuid()} value={pos}>{pos}</option>
        })}
      </select>
      <EmployeeTable employees={data} onDelete={handleDelete} />
    </>
  )
};

export default EmployeeList;
