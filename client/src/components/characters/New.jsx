import React, { useState } from 'react';
import { Form, Container, Col } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


const New = function () {

    const [inputs, setInputs] = useState({
        name: '',
        gender: '',
        race: '',
        class: '',
        origin: '',
        str: '',
        int: '',
        dex: '',
        con: '',
        cha: '',
        luc: '',
        mainSkill: '',
        secSkill: '',
        weapon: '',
        armor: '',
        story: ''
    });

    const getRandom = () => {
        return Math.ceil(Math.random() * 20);
    };

    const roll = () => {
        setInputs({
            name: inputs.name,
            gender: inputs.gender,
            race: inputs.race,
            class: inputs.class,
            origin: inputs.origin,
            str: getRandom(),
            int: getRandom(),
            dex: getRandom(),
            con: getRandom(),
            cha: getRandom(),
            luc: getRandom(),
            mainSkill: inputs.mainSkill,
            secSkill: inputs.secSkill,
            weapon: inputs.weapon,
            armor: inputs.armor,
            story: inputs.story
        });
    };

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const resp = await Axios.post('/api/characters', inputs);

            if (resp.status === 200) {
                toast("Go forth brave hero!", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            };
        } catch (error) {
            toast("There was an error creating this character...", {
                type: toast.TYPE.ERROR
            });
        }
        
    };

    const handleInputChange = async event => {
        event.persist();

        const {name, value} = event.target;

        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    if (redirect) return (<Redirect to="/characters"/>);

    return (
        <Container>
            <header>
                <h1>New Character</h1>
            </header>
            <hr/>
            <h3>General</h3>
            <hr/>

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Name:
                        </Form.Label>
                        <Form.Control
                        name="name"
                        onChange={handleInputChange}
                        value={inputs.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Gender:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="gender"
                        onChange={handleInputChange}
                        defaultValue={inputs.gender || '---Select Gender---'}
                        >
                            <option value="">---Select Gender---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="None">None</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Race:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="race"
                        onChange={handleInputChange}
                        defaultValue={inputs.race || '---Select Race---'}
                        >
                            <option value="">---Select Race---</option>
                            <option value="Human">Human</option>
                            <option value="Elf">Elf</option>
                            <option value="Dwarf">Dwarf</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Class:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="class"
                        onChange={handleInputChange}
                        defaultValue={inputs.class || '---Select Class---'}
                        id="classDrop"
                        >
                            <option value="">---Select Class---</option>
                            <option value="Fighter">Fighter</option>
                            <option value="Mage">Mage</option>
                            <option value="Ranger">Ranger</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Origin:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="origin"
                        onChange={handleInputChange}
                        defaultValue={inputs.origin || '---Select Origin---'}
                        >
                            <option value="">---Select Origin---</option>
                            <option value="Hero">Hero</option>
                            <option value="Scholar">Scholar</option>
                            <option value="Criminal">Criminal</option>
                        </Form.Control>
                    </Form.Group>

                    <hr/>
                    <h3>Stats</h3>
                    <hr/>

                    <Form.Row>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    STR
                                </Form.Label>
                                <Form.Control type="number" name="str" max="20" defaultValue={inputs.str || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    INT
                                </Form.Label>
                                <Form.Control type="number" name="int" max="20" defaultValue={inputs.int || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    DEX
                                </Form.Label>
                                <Form.Control type="number" name="dex" max="20" defaultValue={inputs.dex || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    CON
                                </Form.Label>
                                <Form.Control type="number" name="con" max="20" defaultValue={inputs.con || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    CHA
                                </Form.Label>
                                <Form.Control type="number" name="cha" max="20" defaultValue={inputs.cha || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label>
                                    LUC
                                </Form.Label>
                                <Form.Control type="number" name="luc" max="20" defaultValue={inputs.luc || ''} onChange={handleInputChange}/>
                            </Col>
                        </Form.Group>
                    </Form.Row>

                    <button name="statButton" className="btn btn-danger" type="button" onClick={roll}>Roll Stats</button>

                    <hr/>
                    <h3>Skills/Equipment</h3>
                    <hr/>

                    <Form.Group>
                        <Form.Label>
                            Main Skill:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="mainSkill"
                        onChange={handleInputChange}
                        defaultValue={inputs.mainSkill || '---Select Skill---'}
                        >
                        
                            <option value="">---Select Skill---</option>
                            <optgroup label="Fighter Skills">
                                <option value="Slash">Slash</option>
                                <option value="Shield Bash">Shield Bash</option>
                            </optgroup>
                            <optgroup label="Mage Skills">
                                <option value="Fire Ball">Fire Ball</option>
                                <option value="Ice Blast">Ice Blast</option>
                            </optgroup>
                            <optgroup label="Ranger Skills">
                                <option value="Backstab">Backstab</option>
                                <option value="Multishot">Multishot</option>
                            </optgroup> 
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Secondary Skill:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="secSkill"
                        onChange={handleInputChange}
                        defaultValue={inputs.secSkill || '---Select Skill---'}
                        >
                            <option value="">---Select Skill---</option>
                            <optgroup label="Fighter Skills">
                                <option value="Defend">Defend</option>
                                <option value="Provoke">Shield Bash</option>
                            </optgroup>
                            <optgroup label="Mage Skills">
                                <option value="Detect Magic">Detect Magic</option>
                                <option value="Heal">Heal</option>
                            </optgroup>
                            <optgroup label="Ranger Skills">
                                <option value="Steal">Steal</option>
                                <option value="Sneak">Sneak</option>
                            </optgroup>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Weapon:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="weapon"
                        onChange={handleInputChange}
                        defaultValue={inputs.weapon || '---Select Weapon---'}
                        >
                            <option value="">---Select Weapon---</option>
                            <optgroup label="Fighter Weapons">
                                <option value="Sword and Shield">Sword and Shield</option>
                                <option value="Two-Handed Axe">Two-Handed Axe</option>
                            </optgroup>
                            <optgroup label="Mage Weapons">
                                <option value="Staff">Staff</option>
                                <option value="Wand">Wand</option>
                            </optgroup>
                            <optgroup label="Ranger Weapons">
                                <option value="Bow">Bow</option>
                                <option value="Daggers">Daggers</option>
                            </optgroup>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Armor:
                        </Form.Label>
                        <Form.Control
                        as="select"
                        name="armor"
                        onChange={handleInputChange}
                        defaultValue={inputs.armor || '---Select Armor---'}
                        >
                            <option value="">---Select Armor---</option>
                            <optgroup label="Fighter Armor">
                                <option value="Plate Mail">Plate Mail</option>
                                <option value="Chain Mail">Chain Mail</option>
                            </optgroup>
                            <optgroup label="Mage Armor">
                                <option value="Robe">Robe</option>
                                <option value="Cloak">Cloak</option>
                            </optgroup>
                            <optgroup label="Ranger Armor">
                                <option value="Leather">Leather</option>
                                <option value="Scale">Scale</option>
                            </optgroup>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Story:
                        </Form.Label>
                        <Form.Control
                        as="textarea"
                        name="story"
                        onChange={handleInputChange}
                        defaultValue={inputs.story}
                        />
                    </Form.Group>

                    <hr/>
                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
};

export default New;