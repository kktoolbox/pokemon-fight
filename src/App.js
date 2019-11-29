import { sum } from 'ramda';
import React from 'react';
import { ButtonToolbar, Col, Container, ListGroup, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import pokemonAtkTypes from './pokemonAtkTypes.json';
import pokemonTypes from './pokemonTypes.json';
import { getPokemonTypeBySid } from './utils.js';

const App = () => {
  const MAX_SELECTED = 3
  const [selectedSidList, setSelectedSidList] = React.useState([])
  return (
    <div className="py-5">
      <Container>
        <h1 className="text-center mb-5">Pokemon Fight</h1>
        <div className="overflow-auto mb-3">
          <ButtonToolbar>
            <ToggleButtonGroup type="checkbox" value={selectedSidList} onChange={value => setSelectedSidList(value.slice(-MAX_SELECTED))}>
              {
                pokemonTypes.map(pokemonType => {
                  const sid = pokemonType.sid
                  return <ToggleButton key={sid} variant="light" value={sid}>{pokemonType.typeNameTw}</ToggleButton>
                })
              }
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>
        <Row>
          <Col>
            <div className="mb-1">&nbsp;</div>
            <ListGroup variant="flush" className="text-right">
              {Object.keys(pokemonAtkTypes).map(atkType =>
                <ListGroup.Item key={atkType}>{pokemonAtkTypes[atkType]}</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          {
            selectedSidList.map(selectedSid => {
              const pokemonType = getPokemonTypeBySid(selectedSid)
              return <Col key={selectedSid}>
                <div className="text-center mb-1">{pokemonType.typeNameTw}</div>
                <ListGroup>
                  {Object.keys(pokemonAtkTypes).map(atkType => {
                    return <ListGroup.Item key={atkType}>{pokemonType.atkType[0][atkType]}</ListGroup.Item>
                  })}
                </ListGroup>
              </Col>
            })
          }
          <Col>
            <div className="text-center mb-1">總和</div>
            <ListGroup>
              {Object.keys(pokemonAtkTypes).map(atkType => {
                return <ListGroup.Item key={atkType}>{sum(
                  selectedSidList.map(selectedSid => {
                    const pokemonType = getPokemonTypeBySid(selectedSid)
                    return pokemonType.atkType[0][atkType]
                  })
                )}</ListGroup.Item>
              })}
            </ListGroup>
          </Col>
        </Row>

      </Container>

    </div >
  );
}

export default App;
