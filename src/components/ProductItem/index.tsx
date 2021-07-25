import styles from './styles.module.scss';

interface ProductItemProps {
 name: string;
}

export function ProductItem(props: ProductItemProps){
  return (
    <li className={styles.listProduct}>
      <strong>{props.name}</strong>
    </li>
  )
}