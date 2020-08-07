import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from  'react-router-dom';

const Index = function ({user}) {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        (async () => {
            await getCharacters();
        })();
    }, []);

    const getCharacters = async () => {
        const charactersResp = await Axios.get('/api/characters');
        if (charactersResp.status === 200) setCharacters(charactersResp.data);
    };

    const deleteCharacter = async character => {

        try {
            const resp = await Axios.post('/api/characters/delete', {
                id: character._id
            });

            if (resp.status === 200) toast("The character was deleted successfully!",{type: toast.TYPE.SUCCESS});
            
            await getCharacters();       
        } catch (error) {
            toast("There was an error deleting the character", {
                type: toast.TYPE.ERROR
            });
        }
    };

    return (
        <Container className='my-5'>
            <header>
                <h1>Character List</h1>
            </header>

            <hr/>

            <div className="content">
                {characters && characters.map((character, i) => (
                    <div key={i} className="card border-info my-3">
                        <div className="card-header clearfix">
                            <div className='float-left'>
                                <h5 className="card-title">
                                    {character.name}
                                </h5>

                                {user ? (
                                    <small>~{character.user.fullname}</small>
                                ) : null}
                            </div>

                            <div className="float-right">
                                <small>{character.updatedAt}</small>                                    
                            </div>  
                        </div>
                        <div className="card-body text-info">
                            <p className="card-text">
                                {character.description}
                            </p>
                            </div> 

                            {user ? (
                                <div className="card-footer">
                                        <Link to={{
                                            pathname: '/characters/edit',
                                            state: {
                                                id: character._id
                                            }
                                        }}>
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                    <button type="button" onClick={() => deleteCharacter(character)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            ) : null}         
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Index;