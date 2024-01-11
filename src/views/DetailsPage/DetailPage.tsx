import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterDetails } from "../../redux/slices/characterSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { ExtendedCharacter } from "../../interfaces/interfaces"; // Import ExtendedCharacter

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const characterDetails = useSelector(
    (state: RootState) => state.characters.selectedCharacter
  ) as ExtendedCharacter;

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterDetails(id));
    }
  }, [dispatch, id]);

  const renderDetailsListItems = (details: any[]) => {
    return details.length > 0 ? (
      details.map((detail, index) => (
        <ListGroup.Item key={index}>
          {detail.name || detail.title}
        </ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item>None</ListGroup.Item>
    );
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <h1>Character Details</h1>
          <p>Details for character: {characterDetails?.name}</p>
          <ListGroup variant="flush" className="shadow">
            <ListGroup.Item>
              Species:{" "}
              {characterDetails?.speciesDetails
                ? renderDetailsListItems(characterDetails.speciesDetails)
                : "Unknown"}
            </ListGroup.Item>
            <ListGroup.Item>
              Films:{" "}
              {characterDetails?.filmsDetails
                ? renderDetailsListItems(characterDetails.filmsDetails)
                : "Unknown"}
            </ListGroup.Item>
            <ListGroup.Item>
              Spaceships:{" "}
              {characterDetails?.starshipsDetails
                ? renderDetailsListItems(characterDetails.starshipsDetails)
                : "Unknown"}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPage;
