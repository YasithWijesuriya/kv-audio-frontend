import "./productCard.css";

export default function ProductCard(props) {
    console.log(props)

  return (
    <div className="product-card">
      <h1>Product Card</h1>
      <img src={props.img} alt="Product" />
      <span>{props.name}</span>
      <span className="price">{props.price}</span>
      <p>{props.description}</p>
    </div>
  );
}
