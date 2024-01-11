// FiltersComponent.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../../redux/slices/filterSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

export const FiltersComponent = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    minMass: "",
    maxMass: "",
  });

  const applyFilters = () => {
    const { minMass, maxMass, ...rest } = filters;
    const filterData = {
      ...rest,
      massRange: {
        min: minMass === "" ? null : parseInt(minMass),
        max: maxMass === "" ? null : parseInt(maxMass),
      },
    };
    dispatch(setFilter(filterData));
  };

  const handleReset = () => {
    setFilters({
      name: "",
      gender: "",
      minMass: "",
      maxMass: "",
    });
    dispatch(resetFilters());
  };

  return (
    <Form className="filter-form mb-4">
      <Row>
        <Col md={3}>
          <Form.Group controlId="nameFilter">
            <Form.Control
              type="text"
              placeholder="Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="genderFilter">
            <Form.Control
              as="select"
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="minMassFilter">
            <Form.Control
              type="number"
              placeholder="Min Mass"
              value={filters.minMass}
              onChange={(e) =>
                setFilters({ ...filters, minMass: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="maxMassFilter">
            <Form.Control
              type="number"
              placeholder="Max Mass"
              value={filters.maxMass}
              onChange={(e) =>
                setFilters({ ...filters, maxMass: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="text-center mt-2">
          <Button variant="primary" onClick={applyFilters} className="me-3">
            Apply Filters
          </Button>{" "}
          <Button variant="secondary" onClick={handleReset}>
            Reset Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
