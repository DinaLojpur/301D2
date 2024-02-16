import React, { useEffect, useContext, useState } from 'react';
import {
  Button,
  Row,
  Col,
  Label,
  FormGroup,
} from 'reactstrap';

import moment from 'moment-timezone';
import Select from 'react-select';
import { notification } from 'antd';
import UserContext from '../profile/UserContext';

const PersonalSettingsComponent = () => {
    const { mockUserData, updateUser } = useContext(UserContext);

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [firstName, setFirstName] = useState(mockUserData.first_name);
    const [display, setDisplay] = useState(mockUserData.username);
    const [lastName, setLastName] = useState(mockUserData.last_name);
    const [email, setEmail] = useState(mockUserData.email);
    const [timeZone, setTimeZone] = useState(mockUserData.timezone || '');
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = { 
            ...mockUserData, 
            first_name: firstName, 
            last_name: lastName, 
            email: email, 
            timezone: timeZone 
        };
        updateUser(updatedUserData);
        notification.success({ message: 'Profile Update', description: 'Profile Updated Successfully!' });
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
          case 'first-name':
            setFirstName(value);
            break;
          case 'last-name':
            setLastName(value);
            break;
          case 'display-name':
            setDisplay(value);
            break;
          case 'email':
            setEmail(value);
            break;
          default:
            break;
        }
    };

    const handleTimeZoneChange = (selectedOption) => {
        setTimeZone(selectedOption.value);
    };

    const onImageChange = (e) => {
        setImages([...e.target.files]);
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    const timeZoneOptions = moment.tz.names().map((zone) => {
        const abbreviation = moment.tz(zone).format('z');
        return {
          value: zone,
          label: `${zone} (${abbreviation})`,
        };
      });

    return (
        <Row>
            <Col sm="12">
                <form onSubmit={handleSubmit}>
                    <Row> 
                        <Row>
                            <Col>
                            {imageURLs.map((imageSrc, index) => (
                            <img
                                key={index}
                                src={imageSrc}
                                alt={`profile-pic-${index}`}
                                style={{ width: '100px', height: '100px', margin: '5px' }}
                            />
                            ))}
                            </Col>
                        </Row>
                        <Col>
                            <FormGroup controlId="file" className='mb-3'>
                                <Label>Profile Picture</Label>
                                <div className="m-0">
                                    <input type="file" accept="image/*" onChange={onImageChange}/>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup className="mb-3" controlId="formBasicEmail">
                                <Label>First Name</Label>
                                <input
                                    name="first-name"
                                    type="text"
                                    value={firstName}
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className='mb-3' controlId="formBasicEmail">
                                <Label>Last Name</Label>
                                <input
                                    name="last-name"
                                    value={lastName}
                                    type="text"
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className='mb-3' controlId="formBasicEmail">
                                <Label>Display Name</Label>
                                <input
                                    name="display-name"
                                    type="text"
                                    value={display}
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup className='mb-3' controlId="formBasicEmail">
                                <Label>Email</Label>
                                <input
                                    name="email"
                                    type="text"
                                    value={email}
                                    className="form-control"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className='mb-3' controlId="formGridTime">
                                <Label>Time Zone</Label>
                                <Select
                                    value={timeZoneOptions.find((option) => option.value === timeZone)}
                                    onChange={handleTimeZoneChange}
                                    options={timeZoneOptions}
                                    placeholder="Choose..."
                                />
                            </FormGroup>
                        </Col>
                        <FormGroup>
                            <Button type="submit" color="info" className="btn">
                                Update
                            </Button>
                        </FormGroup>
                    </Row>
                </form>
            </Col>
        </Row>
    );
};

export default PersonalSettingsComponent;