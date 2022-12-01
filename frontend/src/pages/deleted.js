import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function deleted() {
    const navigate = useNavigate();
    
    useEffect(() => {
        deleteData();
    }, []);

    const deleteData = () => {
        navigate('/QuoteListS');
      };

    return (
        <div>deleted</div>
    )
}
