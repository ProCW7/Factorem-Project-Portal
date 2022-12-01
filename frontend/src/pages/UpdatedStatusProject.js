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



export default function UpdatedStatusProject() {
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
        } else if (status === "r") {
            handleR();
        } else if (status === "d") {
            handleD();
        }
    };

    const handleA = async (e) => {
        await axios.post('http://localhost:8080/projects/status/edit',{
            id : id,
            status: "approved",
        });
        navigate('/ProjectDataList');
    }
    
    const handleR = async (e) => {
        await axios.post('http://localhost:8080/projects/status/edit',{
            id : id,
            status: "rejected",
        });
        navigate('/ProjectDataList');
    }
    
    const handleD = async (e) => {
        await axios.post('http://localhost:8080/projects/status/edit',{
            id : id,
            status: "delivered",
        });
        navigate('/ProjectDataList');
    }

    return (
        <div></div>
    )
}
