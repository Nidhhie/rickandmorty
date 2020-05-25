import React ,{useState} from 'react';
import PropTypes from 'prop-types';

Sort.propTypes = {
    sortByID : PropTypes.func
};

function Sort(props) {
    const [selected,setSelected] = useState("")
    const {sortByID} = props;
    const onSelect = (e) => {
        setSelected(e.target.value)
           sortByID(e.target.value)
    }
    return (
        <div className="sort-container">
            <select value={selected} onChange = {onSelect}>
            <option value="" disabled selected>Sort by ID </option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    );
}

export default Sort;