import React from 'react';
import PropTypes from 'prop-types';
const charDesc = [
    {heading:"STATUS",
     apiVar: "status",
    },
    {heading:"SPECIES",
     apiVar: "species",
    },
    {heading:"GENDER",
     apiVar: "gender",
    },
    {heading:"ORIGIN",
     apiVar: "origin",
     hasName:true
    },
    {heading:"STATUS",
     apiVar: "status",
    },
    {heading:"LAST LOCATION",
     apiVar: "location",
     hasName:true
    },
]    
const CharacterCard = props => {
    const {character} = props;
    const {name,image,id} = character;
    return (
        <div className="character-card">
            <img src = {image}/>
            <div className="transparent-heading">
                {name}
            
               <div className="sub-heading">id : {id} </div> 
            </div>
          {
              charDesc.map((desc,index)=>(
                  <section key={index} className="desc">
                      {desc.heading}
                  <div className="name">
                      {desc.hasName ? character[desc.apiVar]["name"] : character[desc.apiVar]}
                  </div>
                  </section>
                 
              ))
          }
        </div>
    );
};

CharacterCard.propTypes = {
    character: PropTypes.object
};

export default CharacterCard;