import PropTypes from "prop-types";

function MoreIcon({ color, className }) {
  return (
    <svg fill={color} className={className} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60">
      <g>
        <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z" />
        <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z" />
        <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" />
      </g>
    </svg>
  );
}

MoreIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default MoreIcon;
