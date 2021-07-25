import Head from 'next/head';
import React, { useState } from 'react';
import styles from './home.module.scss';
import axios from 'axios';
import { ProductItem } from '../components/ProductItem';

interface Product {
  id: string;
  name: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [products, setProducts] = useState<Product[]>([] as Product[]);

  async function getProducts() {
    if (!input) return;

    const response = axios.get(
      `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${input}&source=nanook`,
    );
    const productsApi: Product[] = (await response).data.products;
    setProducts(productsApi);
    setInput('');
  }

  return (
    <>
      <Head>
        <title>Listagem de produtos</title>
      </Head>
      <main className={styles.contentContainer}>
        <span>Listagem de produtos</span>
        <div className={styles.listContainer}>
        <input
          type="text"
          placeholder="Produto"
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
        ></input>
        <button type="button" onClick={() => getProducts()}>
          Pesquisar
        </button>
        </div>
        <ul>
          {products.map(item => (
            <ProductItem key={item.id} name={item.name} />
          ))}
        </ul>
      </main>
    </>
  );
}
