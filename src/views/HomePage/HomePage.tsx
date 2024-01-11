import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredCharacters } from "../../redux/characterSelectors";
import { fetchCharacters } from "../../redux/slices/characterSlice";
import Card from "../../components/Card/Card";
import { Character } from "../../interfaces/interfaces";
import { AppDispatch } from "../../redux/store";
import { Container, Row, Col } from "react-bootstrap";
import { FiltersComponent } from "../../components/Filters/Filters";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredCharacters = useSelector(selectFilteredCharacters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <Container fluid className="py-4">
      <FiltersComponent /> 
      <Row className="g-4">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character: Character) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={character.name}>
              <Card character={character} />
            </Col>
          ))
        ) : (
          <Col>
            <p>Loading...</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
