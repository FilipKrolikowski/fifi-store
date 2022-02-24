import "./UpcomingItem.scss";

function UpcomingItem({ item }) {
  return (
    <div className="upcoming-item-container d-flex align-items-center justify-content-center px-4 py-2 col-12 col-md-6">
      <div className="upcoming-item">
        <div
          className="upcoming-item-content d-flex flex-column justify-content-center h-100 w-100 ps-4"
          style={{ backgroundImage: `url('${item.image}')` }}
        >
          <div className="name mb-3">{item.name}</div>
          <div className="coming-soon">Już wkrótce w sprzedaży!</div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingItem;
