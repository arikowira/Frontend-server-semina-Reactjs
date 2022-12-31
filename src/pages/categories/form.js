import React from 'react';
import { Form } from 'react-bootstrap';
import SButton from '../../components/button';
import TextInputWithLabel from '../../components/textInputWithLabel';

export default function CategoriesForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukan nama kategori'}
        label={'Nama kategori'}
        name='name'
        value={form.name}
        type='text'
        onChange={handleChange}
      />
      <SButton variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </SButton>
    </Form>
  );
}