import React, { useContext } from 'react';
import { Authcontext } from './Authcontext';

const Useauth = () => {
    return (
        useContext(Authcontext)
    );
};

export default Useauth;