import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

FilterBox.propTypes = {
    filterData: PropTypes.object,
    filterCharacters: PropTypes.func,
    uncheckFilter: PropTypes.object,
    resetAllFilters: PropTypes.bool
};

function FilterBox(props) {
    const {filterData,filterCharacters,uncheckFilter,resetAllFilters} = props;
    const { name, options } = filterData;
    const filters = [];
    const onCheck = (value,isChecked) => {
        filterCharacters(name.toLowerCase(),value,isChecked)
    }
    return (
        <div className="filter-box">
            <h3>
            {name}
            </h3>
            <div>
                {
                    options.map((eachOption, index) => {
                        let shouldUncheckFilter = false;
                        if(resetAllFilters || (uncheckFilter.name == name.toLowerCase() && uncheckFilter.value == eachOption.value)){
                            shouldUncheckFilter = true;
                        }
                        return <CheckBox key={index} shouldUncheckFilter={shouldUncheckFilter} checkboxData={eachOption} onCheck={onCheck} />
                    }
                    )
                }
            </div>
        </div>
    );
}

export default FilterBox;