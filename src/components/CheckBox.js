import React , {useState,useEffect} from 'react';
import PropTypes from 'prop-types';

CheckBox.propTypes = {
    
};

function CheckBox(props) {
    const {checkboxData,onCheck,shouldUncheckFilter} = props;
    const {name} = checkboxData
    const [isChecked , setIsChecked] = useState(false);
    const onCheckBoxUpdate = (e) => {
        const {checked} = e.target;
        setIsChecked(checked);
        onCheck(checkboxData.value,checked)
    }

    useEffect(()=>{
        if(shouldUncheckFilter)
        setIsChecked(false)
     }, [shouldUncheckFilter])
    return (
        <div className="checkbox-container">
      <input type="checkbox" checked={isChecked} onChange={onCheckBoxUpdate} />
      {name}  
        </div>
    );
}

export default CheckBox;