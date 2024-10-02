import { Link } from "react-router-dom"

const PRODUCTS = [
    { id: 'prod-1', name: 'Product-1' },
    { id: 'prod-2', name: 'Product-2' },
    { id: 'prod-3', name: 'Product-3' },
]

export default function ProductsPage() {
    return (
        <>
            <h1>The Products Page!</h1>
            <ul>
                {PRODUCTS.map((prod) => (
                    <li key={prod.id}>
                        <Link to={prod.id}>{prod.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}