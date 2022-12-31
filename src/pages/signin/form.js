import React from 'react';
import SButton from '../../components/button';
import TextInputWithLabel from '../../components/textInputWithLabel';
import { Form } from 'react-bootstrap';

export default function SForm({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        label='Email Address'
        name='email'
        value={form.email}
        type='email'
        onChange={handleChange}
        placeholder='Email'
      />
      <TextInputWithLabel
        label='Password'
        name='password'
        value={form.password}
        type='password'
        onChange={handleChange}
        placeholder='Password'
      />
      <SButton
        loading={isLoading}
        disabled={isLoading}
        variant='primary'
        action={handleSubmit}
      >
        Submit
      </SButton>
    </Form>
  );
}
