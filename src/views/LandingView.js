import React from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import FilterBox from '../components/FilterBox';
import Sort from '../components/Sort';
import Search from '../components/Search';

if (process.env.WEBPACK) require('../scss/index.scss');

const filters = [{
    name: "Species",
    options: [{ name: "Human", value: "Human" }, { name: "Mythology", value: "Mythology" }, { name: "Other Species", value: "other" }]
},
{
    name: "Gender",
    options: [{ name: "Male", value: "Male" }, { name: "Female", value: "Female" }]
}
    , {
    name: "Origin",
    options: [{ name: "Unknown", value: "unknown" }, { name: "Post-Apocalyptic Earth", value: "Post-Apocalyptic Earth" }, { name: "Nuptia 4", value: "Nuptia 4" }, { name: "Other Origins", value: "other" }]
}]
const otherOriginArray = ["unknown", "Post-Apocalyptic Earth", "Nuptia 4"]
const otherSpeciesArray = ["Human", "Mythology"]

class LandingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charactersData: null,
            errorMessage: null,
            filteredCharactersData: null,
            uncheckFilter : {name:"",value:""},
            filterObj : {}
        }
    }
    async componentDidMount() {
        try {
            const result = await axios.get("https://rickandmortyapi.com/api/character/");
            if (result.data && result.data.results) {
                this.setState({ charactersData: result.data.results,filteredCharactersData:result.data.results })
            }
        }
        catch (e) {
            this.setState({ errorMessage: e.message })
        }
    }

    filterCharacters = (filterName, filterValue, isChecked) => {
        const { charactersData,filterObj } = this.state;
        if (!isChecked) {
            this.resetFilter(filterName, filterValue);
            return;
        }
        if (filterObj[filterName] && filterObj[filterName].indexOf(filterValue) === -1)
            filterObj[filterName].push(filterValue)
        else
            filterObj[filterName] = [filterValue];

        let filtered = charactersData;      
        this.resetFilterData = false;

        for(let key in filterObj){ 
            filtered = filtered.filter((eachCharacter) => {
                return filterObj[key].some((filterType) => {
                    if(filterType === "other"){
                        let otherArray = key === 'origin' ? otherOriginArray : otherSpeciesArray;
                         return !otherArray.includes(key === 'origin' ? eachCharacter[key].name : eachCharacter[key])
                    }
                    return key === 'origin' ? filterType === eachCharacter[key].name : filterType === eachCharacter[key] 
                     })  
            })
        }

        this.setState({ filteredCharactersData: filtered ,shouldResetAllFilters:false})
    }

    resetFilter = (filterName, filterValue) => {
        const {filterObj} = this.state;
        this.resetFilterData = true;
        this.setState({uncheckFilter: {name:filterName,value:filterValue}});
        if (filterValue) {
            let index = filterObj[filterName].indexOf(filterValue)
            if (index !== -1) {
                filterObj[filterName].splice(index, 1);
            }
        }
        else
            delete filterObj[filterName];

        if (filterObj[filterName].length == 0) {
            delete filterObj[filterName];

            if (Object.keys(filterObj).length == 0) {
                this.setState({ filteredCharactersData: this.state.charactersData });
                return;
            }

        }
        for (let key in filterObj) {
            filterObj[key].forEach((filterValue) => {
                this.filterCharacters(key, filterValue, true)
            })
        }
    }

    sortByID = (order) => {
        const {charactersData,filteredCharactersData} = this.state;
        let data = filteredCharactersData || charactersData;
        if(order === "ascending")
          data.sort((a,b)=> a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
        else
          data.sort((a,b)=>a.id < b.id ? 1 : b.id < a.id ? -1 : 0)
        
        if(filteredCharactersData) {
            this.setState({filteredCharactersData:data})
        }
        else
        this.setState({charactersData:data})
    }

    searchByName = (nameString) => {
        this.resetAllFilters();
        const {charactersData} = this.state;
        const searchData = charactersData.filter((eachChar)=> (eachChar.name.toLowerCase().includes(nameString.toLowerCase())));
            this.setState({filteredCharactersData:searchData})
    }
    resetAllFilters = () => {
       this.setState({filterObj:{},uncheckFilter : {name:"",value:""},shouldResetAllFilters:true})
    }

    render() {
        const { errorMessage, charactersData, filteredCharactersData,uncheckFilter,filterObj,shouldResetAllFilters } = this.state;
        const data = filteredCharactersData || charactersData;
        return (
            <div className="landing-container">
                {data ? (
                    <div className="wrapper">
                        <div className="filter">
                            <h2> Filters </h2>
                            {
                                filters.map((eachFilter, index) => (
                                    <FilterBox 
                                    key={index}
                                    uncheckFilter = {uncheckFilter }
                                    filterData={eachFilter}
                                    resetAllFilters={shouldResetAllFilters}
                                    filterCharacters={this.filterCharacters} />
                                ))
                            }
                        </div>
                        <div className="char-container">
                        {Object.keys(filterObj).length > 0 && <h2> Selected Filters </h2>}
                            <div className="view-filters-container">
                                {Object.keys(filterObj).map((eachFilterCategory, index) => (
                                    filterObj[eachFilterCategory].map((eachfilter) => (
                                        <button onClick={()=> this.resetFilter(eachFilterCategory,eachfilter)}>
                                            {eachfilter === 'other' ? eachfilter + " " + eachFilterCategory : eachfilter} X
                                        </button>
                                    )
                                    )
                                ))}
                            </div>
                            <div className="search-sort-wrapper">
                                <Search onSearch={this.searchByName} />
                                <Sort sortByID={this.sortByID} />
                            </div>
                            <div className="character-list">
                                {data.map((eachCharacter, index) => (
                                    <CharacterCard character={eachCharacter} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
                    : errorMessage ? errorMessage : null
                }
            </div>
        )
    }

}

export default LandingView