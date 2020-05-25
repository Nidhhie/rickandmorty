import React,{useState} from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
    onSearch : PropTypes.func
};

function Search(props) {
    const {onSearch} = props;
    const [searchKey,setSearchKey] = useState("");
    const handleInputChange = (e) => {
        setSearchKey(e.target.value);
        onSearch(e.target.value)
    }
    return (
        <div className="search-container">
            <div style={{fontsize:14,paddingTop:5,paddingBottom:5}}> Search by name </div>
         <input
            value={searchKey}
            onChange={handleInputChange}
          /> 
        </div>
    );
}

export default Search;