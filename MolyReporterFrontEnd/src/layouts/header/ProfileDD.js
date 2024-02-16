import React, { useState, useEffect, useContext} from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import user1 from '../../assets/images/users/user1.jpg';
import UserContext from '../../views/profile/UserContext';

const ProfileDD = () => {
  const navigate = useNavigate();
  const { mockUserData } = useContext(UserContext);
  const [userData, setUserData] = useState(mockUserData)

  const goToTabs = () => {
    navigate('/ui/tabs'); // Navigate to the Tabs page when the "Settings" option is clicked
  };
  const goToProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    setUserData(mockUserData);
  }, [mockUserData]);

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={userData.photo} alt="user" className="rounded-circle" width="60" />
        <span>
          <h6 className="mb-0">{userData.first_name + ' ' + userData.last_name}</h6>
          <small>{userData.email}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3" onClick={goToProfile}>
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3" onClick={goToTabs}>
        <FileText size={20} />
        &nbsp; Edit Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3" onClick={goToTabs}>
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
