import React, { useState, useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';

import ComponentCard from '../../components/ComponentCard';

import AccountSettingsComponent from '../settings/AccountSettings';
import PersonalSettingsComponent from '../settings/PersonalSettings';

const JumbotronComponent = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [passwordRequirements, setPasswordRequirements] = useState({
    digit: false,
    lowercase: false,
    uppercase: false,
    specialChar: false,
    length: false,
  });

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const updatePasswordRequirements = (password) => {
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[*!@#$%]/;
    const lengthRegex = /^.{8,32}$/;

    setPasswordRequirements({
      digit: digitRegex.test(password),
      lowercase: lowercaseRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      specialChar: specialCharRegex.test(password),
      length: lengthRegex.test(password),
    });
  };

  return (
    <>
      <ComponentCard title="Settings">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Personal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Account
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <PersonalSettingsComponent />
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <AccountSettingsComponent updatePasswordRequirements={updatePasswordRequirements}/>
              </Col>
              <Col sm="6" style={{ fontSize: "14px"}}>
              <ComponentCard title="Password Requirements">
                <ul>
                  <li style={{ color: passwordRequirements.digit ? 'green' : 'red' }}>At least one digit [0-9].</li>
                  <li style={{ color: passwordRequirements.lowercase ? 'green' : 'red' }}>At least one lowercase character [a-z].</li>
                  <li style={{ color: passwordRequirements.uppercase ? 'green' : 'red' }}>At least one uppercase character [A-Z].</li>
                  <li style={{ color: passwordRequirements.specialChar ? 'green' : 'red' }}>At least one special character [*!@#$%].</li>
                  <li style={{ color: passwordRequirements.length ? 'green' : 'red' }}>At least 8 characters in length, but no more than 32.</li>
                </ul>
              </ComponentCard>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
