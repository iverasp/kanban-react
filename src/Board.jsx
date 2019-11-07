import React, { Component } from 'react';
import styled from 'styled-components'

const Lanes = styled.div`
  display: flex;
  flex-direction: row;
`;

const Lane = styled.div`
  width: 20vw;
  height: 600px;
  background: #E7E5DF;
  padding: 10px;
  ${({ isDraggedOver }) => isDraggedOver && `
    background: green;
  `}
`;

const LaneTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #393E41;
`;

const Cards = styled.div`
  background: white;
  height: 90%;
  border-radius: 6px;
  ${({ isDragging }) => isDragging && `
    outline-style: dotted;
    outline-color: #44BBA4;
  `}
`;

const Card = styled.div`
  border: 2px solid #44BBA4;
  border-radius: 6px;
  padding: 10px;
  /*
  ${({ isDragging }) => isDragging && `
    visibility: hidden;
  `}
  */
`;

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dragCardId: null,
      dragOverLaneId: null,
      lanes: [{ title: 'TODO', id: 'TODO' }, { title: 'IN PROGRESS', id: 'IN_PROGRESS' }, { title: 'DONE', id: 'DONE' }],
      cards: [
        {
          id: 1,
          title: 'Spise kake',
          laneId: 'TODO'
        },
        {
          id: 2,
          title: 'Kjøpe mel',
          laneId: 'TODO'
        },
        {
          id: 3,
          title: 'Lage kake',
          laneId: 'DONE'
        }
      ],
    };
  }

  dragStartHandler(cardId) {
    this.setState({ dragging: true, dragCardId: cardId });
  }

  dragEndHandler() {
    this.setState({ dragging: false, dragCardId: null });
  }

  dragOverHandler(event, lane) {
    event.preventDefault();
    this.setState({ dragOverLaneId: lane.id });
  }

  dropHandler(lane) {
    const cardIndex = this.state.cards.findIndex(card => card.id === this.state.dragCardId);
    const newCards = this.state.cards.slice();
    newCards[cardIndex].laneId = lane.id;
    this.setState({ cards: newCards, dragging: false, dragOverLaneId: null });
  }

  render() {
    return (
      <Lanes>
        {this.state.lanes.map(lane => (
          <Lane key={lane.id} isDraggedOver={this.state.dragOverLaneId === lane.id}>
            <LaneTitle>{lane.title}</LaneTitle>
            <Cards isDragging={this.state.dragging} onDrop={() => this.dropHandler(lane)} onDragOver={event => this.dragOverHandler(event, lane)}>
              {this.state.cards.filter(card => card.laneId === lane.id).map(card => (
                <Card
                  key={card.id}
                  draggable
                  onDragStart={() => this.dragStartHandler(card.id)}
                  onDragEnd={() => this.dragEndHandler()}
                  isDragging={this.state.dragging}
                >
                  {card.title}
                </Card>
              ))}
            </Cards>
          </Lane>
        ))}
      </Lanes>
    );
  }
}

export default Board;