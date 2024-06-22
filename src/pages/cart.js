// pages/dashboard.js
import React from 'react';
import { getSession } from 'next-auth/client';

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch user-specific data
  const res = await fetch(`https://fakestoreapi.com/users/${session.user.id}/orders`);
  const orders = await res.json();

  return {
    props: {
      orders,
      user: session.user,
    },
  };
}

const Dashboard = ({ orders, user }) => (
  <div>
    <h1>Welcome, {user.name}</h1>
    <h2>Your Orders</h2>
    <ul>
      {orders.map((order) => (
        <li key={order.id}>Order #{order.id}</li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
