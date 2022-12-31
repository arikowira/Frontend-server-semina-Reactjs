import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import SAlert from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';

export default function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData(`/cms/auth/signin`, form);
    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.email,
          res.data.data.refreshToken
        )
      );

      setIsLoading(false);
      navigate('/');
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? 'Internal Server Error',
        type: 'danger',
      });
    }
  };

  return (
    <Container md={12} className='my-5'>
      <div className='m-auto' style={{ width: '50%' }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: '50%' }} className='m-auto mt-5'>
        <Card.Body>
          <Card.Title className='text-center'>Form Login</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
