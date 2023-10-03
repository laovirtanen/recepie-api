export function DisplayRecepie({ data }) {
  return (
    <div className="recepie-container">
      <h5>{data.title}</h5>
      <img src={data.image} alt={data.title} />
    </div>
  );
}
