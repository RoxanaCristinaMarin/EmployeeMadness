import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";

const fetchEquipment = async (signal) => {
    const res = await fetch("http://localhost:8080/api/equipment", { signal });
    return await res.json();
};

const deleteEquipment= async (id) => {
    const res = await fetch(`http://localhost:8080/api/equipment/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const handleDelete = (id) => {
        deleteEquipment(id).catch((err) => {
            console.log(err);
        });

        setData((equipments) => {
            return equipments.filter((equipment) => equipment._id !== id);
        });
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchEquipment(controller.signal)
            .then((equipments) => {
                setLoading(false);
                setData(equipments);
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

    return (
        <>
            <EquipmentTable equipments={data} onDelete={handleDelete} />
        </>
    );
};

export default EmployeeList;
