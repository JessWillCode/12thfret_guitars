import React from 'react';

export async function getStaticPaths() {
  // Fetch all product IDs
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch product data based on ID
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return { props: { product } };
}

const Product = ({ product }) => (
  <div>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p>Price: ${product.price}</p>
  </div>
);

export default Product;
