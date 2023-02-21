import { useEffect, useState, useRef } from "react";
import uuid from "react-uuid";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (signal) => {
    const res = await fetch("http://localhost:8080/api/employees", { signal });
    return await res.json();
};

const deleteEmployee = async (id) => {
    const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [positions, setPositions] = useState([])
    const [levels, setLevels] = useState([])
    const [posSelected, setPosSelected] = useState()
    const [levSelected, setLevSelected] = useState()
    const [sortSelected, setSortSelected] = useState()
    const filterPos = useRef(null);
    const filterLev = useRef(null);
    const sort = useRef(null);

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
                employees.map((employee) => {
                    return setPositions(prevPosition => prevPosition + employee.position.match(/\S+/g) + `\u0020`), setLevels(prevLevel => prevLevel + employee.level.match(/\S+/g) + `\u0020`);
                });
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setData(null);
                    throw error;
                }
            });

        return () => controller.abort();
    }, []);

  const handlePositionLevelFilter = async () => {
    setPosSelected(filterPos.current.value)
    setLevSelected(filterLev.current.value)
    try{
      const req = await fetch(`http://localhost:8080/api/employees/filter/position-level?position=${filterPos.current.value}&level=${filterLev.current.value}`, {
        headers: {
          'Access-Control-Allow-Origin': true
        },
        mode: 'cors'
      })
      const filteredData = await req.json()
      setData(filteredData)
    }catch (err) {
        console.log(err)
    }
  }

  const handleSort = async () => {
    setSortSelected(sort.current.value)
    try{
      const req = await fetch(`http://localhost:8080/api/employees/sort?${sort.current.value}=${sort.current.value}`, {
        headers: {
          'Access-Control-Allow-Origin': true
        },
        mode: 'cors'
      })
      const sortedData = await req.json()
      setData(sortedData)
    }catch (err) {
        console.log(err)
    }
  }

    if (loading) {
        return <Loading />;
    }

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    const uniquePositions = positions.split(/\s+/).filter(onlyUnique)
    const pos = uniquePositions.map((pos) => {
        return pos.replace(",", " ")
    })

    const uniqueLevels = levels.split(/\s+/).filter(onlyUnique)
   
    return (
        <>
            <select
                name="filter-position"
                id="filter-position"
                ref={filterPos}
                onChange={handlePositionLevelFilter}
                value={posSelected}>
                <option value=''>Filter by position</option>
                {pos.map((pos) => (
                    <option key={uuid()} value={pos}>
                        {pos}
                    </option>
                ))}
                <option value=''>All</option>
            </select>
            <select
                name="filter-level"
                id="filter-level"
                ref={filterLev}
                onChange={handlePositionLevelFilter}
                value={levSelected}>
                <option value=''>Filter by level</option>
                {uniqueLevels.map((lev) => (
                    <option key={uuid()} value={lev}>
                        {lev}
                    </option>
                ))}
                <option value=''>All</option>
            </select>
            <select
                name="sort"
                id="sort"
                ref={sort}
                onChange={handleSort}
                value={sortSelected}>
                <option value=''>Sort by..</option>
                <option value='firstName'>First Name</option>
                <option value='position'>Position</option>
                <option value='level'>Level</option>
            </select>
            <EmployeeTable employees={data} onDelete={handleDelete} isCheck={true} />
        </>
    );
};

export default EmployeeList;
