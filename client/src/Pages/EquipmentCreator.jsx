import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";

const createEquipment = async (equipment) => {
    const res = await fetch("http://localhost:8080/api/equipment", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(equipment),
    });
    return await res.json();
};

const EquipmentCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateEquipment = (equipment) => {
        setLoading(true);

        createEquipment(equipment)
            .then(() => {
                navigate("/equipments");
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <EquipmentForm
            onCancel={() => navigate("/equipments")}
            disabled={loading}
            onSave={handleCreateEquipment}
        />
    );
};

export default EquipmentCreator;
