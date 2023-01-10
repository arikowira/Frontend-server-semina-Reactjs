import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb';
import Button from '../../components/button';
import Table from '../../components/tableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParticipants } from '../../redux/participants/actions';
import AlertMessage from '../../components/alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessParticipant } from '../../utils/access';

function ParticipantsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.notif);
  const participants = useSelector((state) => state.participants);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessParticipant).forEach(function (key, index) {
      if (accessParticipant[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchParticipants());
  }, [dispatch]);

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecond={'Participant'} />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={participants.status}
        thead={['Nama Depan', 'Nama Belakang', 'Role', 'Aksi']}
        data={participants.data}
        tbody={['firstName', 'lastName','role']}
        customAction={(id) => {
          return (
            <Button
              className={'mx-2'}
              variant='primary'
              size={'sm'}
              action={() => navigate(id)}
            >
              Detail
            </Button>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}

export default ParticipantsPage;
