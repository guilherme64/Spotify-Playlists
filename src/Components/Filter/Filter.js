import React,{ Component } from 'react';

import styled from 'styled-components';

const FilterContainer = styled.form`
    width: 20%;
    min-width: 300px;
    left: 20;
    background-color: #1AB24F;
    display: flex;
    flex-direction: column;
    justify-content: top;
    height:100%;
    color: white;

`
const FilterFields = styled.label`
    margin: 10px;
    padding: 5px;
    border-bottom: 1px solid black;
    border-left: 1px solid black;

`

const FilterSelect = styled.select`
    margin: 10px;
    padding: 5px;
    border-radius:5px;
    border: 1px solid #ccc;
`

const FilterInput = styled.input`
    margin: 10px;
    padding: 5px;
    border-radius:5px;
    border: 1px solid #ccc;
`

const FilterTitle = styled.h2`
    margin: 10px;
`

class Filter extends Component{
    constructor(props){
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilter = this.props.handleFilter.bind(this);
        this.state = {
            filterFormFields:{
                locale:{
                    values:[]
                },
                country:{
                    values:[]
                },
                timestamp:'',
                limit:{
                    validation:{}
                },
                offset:'',
            },filters:{
                /*locale:'',
                country:'',
                timestamp:'',
                limit:'',
                offset:'',*/
            }
        }
        
    }
  

    handleFilterChange(event){
        console.log(this.state);

        let curFilters = this.state.filters;
        curFilters[event.target.id] = event.target.value;
        console.log(curFilters);
        this.setState({filters : curFilters});
        this.handleFilter(this.state.filters);

    }

    componentDidMount(){
        fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
        .then(res => res.json())
        .then(result =>{
            this.setState({
                filterFormFields:{
                    country: result.filters.find(cur => cur.id === 'country'),
                    locale: result.filters.find(cur => cur.id === 'locale'),
                    timestamp: result.filters.find(cur => cur.id === 'timestamp'),
                    limit: result.filters.find(cur => cur.id === 'limit'),
                    offset: result.filters.find(cur => cur.id === 'offset')
                }
            });
        })
    }

    render() {
        const formFields = this.state.filterFormFields;

        return(
            <FilterContainer>
                <FilterTitle>Filtros</FilterTitle>
                <FilterFields htmlFor={formFields.country.id}>
                    {formFields.country.name}
                    <FilterSelect onChange={this.handleFilterChange} id={formFields.country.id}>
                        {formFields.country.values.map(cur => <option key={cur.value} value={cur.value} selected={cur.value==='BR'}>{cur.name}</option>)}
                    </FilterSelect>
                </FilterFields>
                <br />
                <FilterFields htmlFor={formFields.locale.id}>
                    {formFields.locale.name}
                    <FilterSelect id={formFields.locale.id} onChange={this.handleFilterChange}>
                        {formFields.locale.values.map(cur => <option key={cur.value} value={cur.value} selected={cur.value==='pt_BR'}>{cur.name} </option>)}
                    </FilterSelect>
                </FilterFields>
                <FilterFields htmlFor={formFields.timestamp.id}>
                    {formFields.timestamp.name}
                    <FilterInput id={formFields.timestamp.id} type="datetime-local" step="1" onChange={this.handleFilterChange}></FilterInput>
                </FilterFields>
                <FilterFields htmlFor={formFields.limit.id}>
                    {formFields.limit.name}
                    <FilterInput id={formFields.limit.id} min={formFields.limit.validation.min} max={formFields.limit.validation.max} type="number" onChange={this.handleFilterChange}></FilterInput>
                </FilterFields>
                <FilterFields htmlFor={formFields.offset.id}>
                    {formFields.offset.name}
                    <FilterInput id={formFields.offset.id} type="number" onChange={this.handleFilterChange}></FilterInput>
                </FilterFields>
                    
            </FilterContainer>
        );
    }
}

export default Filter;