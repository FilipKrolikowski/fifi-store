import Dropdown from "react-bootstrap/Dropdown";
import "./CustomDropdown.scss";

export const CustomDropdown = ({ items = [], action, displayValue = () => {} }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="none" className={`d-flex align-items-center custom-toggle`}>
        <div>{displayValue()}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu align="left">
        {items.map((i) => (
          <div key={`dropdown-item-key-${i.name || i}`}>
            <Dropdown.Item
              className="custom-dropdown-item"
              onClick={() => {
                action(i);
              }}
            >
              {i.name || i}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdown.propTypes = {};
