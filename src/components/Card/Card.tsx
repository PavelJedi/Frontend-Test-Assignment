import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Character } from "../../interfaces/interfaces";

type CardProps = {
  character: Character;
};

const Card: React.FC<CardProps> = ({ character }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const characterId = character.url.split("/").filter(Boolean).pop();
    navigate(`/character/${characterId}`);
  };

  return (
    <BootstrapCard onClick={handleCardClick} className="h-100 shadow-sm mb-4">
      <BootstrapCard.Body>
        <BootstrapCard.Title>{character.name}</BootstrapCard.Title>
        <BootstrapCard.Text>
          Mass: {character.mass || "Unknown"}
        </BootstrapCard.Text>
        <BootstrapCard.Text>
          Gender: {character.gender || "Unknown"}
        </BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
