import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb';
import Button from '../../components/button';
import Table from '../../components/tableWithAction';
import SearchInput from '../../components/searchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  setKeyword,
  setCategory,
  setTalent,
} from '../../redux/events/actions';
import SAlert from '../../components/alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import SelectBox from '../../components/selectBox';
import {
  fetchListCategories,
  fetchListTalents,
} from '../../redux/lists/actions';
import { accessEvents } from '../../utils/access';

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessEvents).forEach(function (key, index) {
      if (accessEvents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/events/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus speaker ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Ubah Status',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === 'Published' ? 'Draft' : 'Published',
        };
        const res = await putData(`/cms/events/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecond={'Events'} />
      {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/events/create')}>
          Tambah
        </Button>
      )}

      <Row>
        <Col>
          <SearchInput
            name='keyword'
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            name='category'
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            name='talents'
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => dispatch(setTalent(e))}
          />
        </Col>
      </Row>
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={events.status}
        thead={[
          'Judul',
          'Tanggal',
          'Tempat',
          'Status',
          'Kategori',
          'Pembicara',
          'Aksi',
        ]}
        data={events.data}
        tbody={[
          'title',
          'date',
          'venueName',
          'statusEvent',
          'categoryName',
          'talentName',
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        customAction={(id, status = '') => {
          return (
            <Button
              className={'mx-2'}
              variant='primary'
              size={'sm'}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </Button>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;