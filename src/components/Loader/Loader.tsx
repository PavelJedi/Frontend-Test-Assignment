import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader: React.FC = () => {
  return (
    <Spinner animation="border" role="status" className="text-purple">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
