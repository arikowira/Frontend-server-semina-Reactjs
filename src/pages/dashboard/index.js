import React from 'react';
import { Container } from 'react-bootstrap';
import SBreadcrumb from '../../components/breadcrumb';

export default function DashboardPage() {
  return (
    <>
      <Container className='mt-5'>
        <SBreadcrumb />
        <h1>Dashboard</h1>
      </Container>
    </>
  );
}
