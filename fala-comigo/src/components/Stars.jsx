export default function Stars({ count }) {
  return (
    <div className="stars-badge">
      <span>⭐</span>
      <span className="stars-count">{count}</span>
    </div>
  );
}
