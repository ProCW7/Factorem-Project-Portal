import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as qs from 'query-string';

// DB Conect
import axios from "axios";

// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const id = parsed['id'];
const status = parsed['s'];
console.log(status);

export default function UpdatedStatusItem() {
    const navigate = useNavigate();
    
    useEffect(() => {
        handleStatus();
    }, []);

    const handleStatus = () => {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        if(status === "a") {
            handleA();
            console.log(id);
        } else if (status === "r") {
            handleR();
        }
    };

    const handleA = async (e) => {
        await axios.post('http://localhost:8080/items/status/edit',{
            id : id,
            status: "approved",
        });
        navigate('/ItemDataList');
    }
    
    const handleR = async (e) => {
        await axios.post('http://localhost:8080/items/status/edit',{
            id : id,
            status: "rejected",
        });
        navigate('/ItemDataList');
    }

    return (
        <div></div>
    )
}
