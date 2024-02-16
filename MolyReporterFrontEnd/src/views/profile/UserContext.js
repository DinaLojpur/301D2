import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [mockUserData, setMockUserData] = useState({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        username: 'johndoe4',
        timezone: 'Canada/Eastern (EST)',
        company: 'Example Inc.',
        number_of_scans: '25',
        position: 'Accessibility Tester',
        since: '2017',
    });

    const updateUser = (newUserData) => {
        setMockUserData(newUserData);
      };
  
    return (
    <UserContext.Provider value={{ mockUserData, setMockUserData, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserContext;