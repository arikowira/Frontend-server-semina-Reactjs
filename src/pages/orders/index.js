import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../components/breadcrumb';
import Table from '../../components/tableWithAction';
import SearchInput from '../../components/searchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage, setDate } from '../../redux/orders/actions';
import { fetchListEvents } from '../../redux/lists/actions';
import DateRange from '../../components/inputDate';
import { formatDate } from '../../utils/formatDate';

function OrderPage() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ''
  }${orders.date?.endDate ? ' - ' + formatDate(orders.date.endDate) : ''}`;

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecond={'Orders'} />
      <Row>
        <Col
          className='cursor-pointer position-relative'
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ''
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>

      <Table
        status={orders.status}
        thead={[
          'Nama',
          'Email',
          'Judul',
          'Tanggal Event',
          'Tanggal Order',
          'Tempat',
        ]}
        data={orders.data}
        tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
        pages={orders.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
}

export default OrderPage;
