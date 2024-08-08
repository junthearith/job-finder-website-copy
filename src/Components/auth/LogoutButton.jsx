import React from 'react';
import useLogout from '../../common/useLogout';
import { Button } from 'flowbite-react';
 // Adjust the import path as needed

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <>
    <Button type="submit" className='mx-auto mt-5' onClick={logout}>
          Logout
    </Button>
    </>
  )
};

export default LogoutButton;
