import React, { useState, useEffect } from 'react';
import { Container, Figure, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/fetch';
import SBreadcrumb from '../../components/breadcrumb';
import { config } from '../../config';
import {
  createImageFromInitials,
  getRandomColor,
} from '../../utils/generateAvatar';

export default function ParticipantDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    image: '',
  });

  const fetchOneParticipants = async () => {
    const res = await getData(`/cms/participants/${id}`);
    setData({
      ...data,
      firstName: res.data.data.firstName,
      lastName: res.data.data.lastName,
      email: res.data.data.email,
      role: res.data.data.role,
      image: res.data.data.image.name,
    });
  };

  useEffect(() => {
    fetchOneParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container className='mt-3'>
        <SBreadcrumb textSecond={'Detail'} />
        <Figure>
          <Figure.Image
            width={100}
            height={180}
            alt='171x180'
            className='rounded-circle'
            src={
              `${config.api_image}/${data.image}` ??
              `${config.api_image}/avatar/${data.image}`
            }
          />
        </Figure>
        <div className='row row-cols-lg-8 row-cols-md-2 row-cols-1'>
          <div className='mb-4 col-lg-4'>
            <label htmlFor='first_name' className='form-label'>
              First Name
            </label>
            <input
              type='text'
              placeholder='First name here'
              className='form-control'
              id='first_name'
              name='firstName'
              value={data.firstName}
              readOnly
            />
          </div>
          <div className='mb-4 col-lg-4'>
            <label htmlFor='first_name' className='form-label'>
              Last Name
            </label>
            <input
              type='text'
              placeholder='First name here'
              className='form-control'
              id='last_name'
              name='lastName'
              value={data.lastName}
              readOnly
            />
          </div>
        </div>
        <div className='row row-cols-lg-8 row-cols-md-2 row-cols-1'>
          <div className='mb-4 col-lg-4'>
            <label htmlFor='first_name' className='form-label'>
              Role
            </label>
            <input
              type='text'
              className='form-control'
              id='role'
              name='role'
              value={data.role}
              readOnly
            />
          </div>
          <div className='mb-4 col-lg-4'>
            <label htmlFor='first_name' className='form-label'>
              Email
            </label>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              value={data.email}
              readOnly
            />
          </div>
        </div>
      </Container>
    </>
  );
}
