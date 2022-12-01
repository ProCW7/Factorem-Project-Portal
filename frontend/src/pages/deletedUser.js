import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function deletedUser() {
    const navigate = useNavigate();
    
    useEffect(() => {
        deleteData();
    }, []);

    const deleteData = () => {
        navigate('/UserList');
      };

    return (
        <div>deleted</div>
    )
}
