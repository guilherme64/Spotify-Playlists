import React,{ Component } from 'react';
import List from './List/List';
import Filter from './Filter/Filter';
import styled from 'styled-components';

import Keys from '../Config/Keys';

const id = Keys.id;
const secret = Keys.secret;
const sourceURL = 'https://api.spotify.com/v1/browse/featured-playlists';

const Wrapper = styled.div`
    margin: 0px;
    height: 100vh;
    width: 100wh;
    display: grid;
    grid-template-rows: 50px auto;
`

const Header = styled.header`
    display: grid;
    background-color: black;
    color: white;
    justify-content: center;
    grid-template-columns: repeat(3,1fr);
`
const Main = styled.main`
    display: grid;
    grid-template-columns: ${props => props.show ? "1fr 4fr" : "1fr"};
    overflow-y: scroll;
`

const Button = styled.button`
    color: white;
    background-color: black;
    border-radius: 5px;
    margin: 5px;
    justify-self: start;
`

const Title = styled.h1`
    
    justify-self: center;
    margin: 5px;
`

class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:'Carregando as playlists...',
            filters:{
                locale:'pt_BR',
                country:'BR'
            }, 
            playlists:{
                items:[],
                next:'',
                prev:''
            },
            show: false
        }
        this.handleFilter = this.handleFilter.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.showFilters = this.showFilters.bind(this);
    }
    
    getAuth(){
        const auth =`${id}:${secret}`;
        const b64Auth = new Buffer(auth).toString('base64');
        const getAccessHeaders= {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':`Basic ${b64Auth}`,    
        }
        return new Promise(resolve => {
            fetch('https://accounts.spotify.com/api/token',{
                method:'post',
                headers:getAccessHeaders,
                body:'grant_type=client_credentials'
                }).then(res => res.json())
            .then(result => {
                const getListHeaders = {
                    'Accept' : 'application/json',
                    'Content-Type' :' application/json',
                    'Authorization' : 'Bearer '+ result.access_token
                }
                resolve(getListHeaders);
            });
        });
        

    }
    async getPlaylists(sourceURL){
        const getListHeaders = await this.getAuth();
        let url = new URL(sourceURL);
        let params = new URLSearchParams(this.state.filters).toString();
        url.search = params;
        
        fetch(url,
        {headers: getListHeaders})
        .then(res => res.json())
        .then(result =>{
            console.log(result);
            this.setState({
                playlists: result.playlists,
                message: result.message
            })
            console.log(this.state);
        });
    }

    componentDidMount(){
        this.getPlaylists(sourceURL);
    }

    handleFilter(filters){
        console.log('chamada');
        this.setState({filters: filters});
        this.getPlaylists(sourceURL);

    }

    showFilters(){
        this.setState({show: this.state.show ? false : true})
    }

    handleButton(event){
        console.log('apertou');
        console.log(this.state.playlists[event.target.id]);
        if(this.state.playlists[event.target.id]){
            this.getPlaylists(this.state.playlists[event.target.id]);
        }else{
            console.log('nada');
        }
    }

    render() {
        return(<Wrapper>
                <Header>
                    <Button onClick ={this.showFilters} >Filtros</Button>
                    <Title>Playlists Escolhidas</Title>
                </Header>
                <Main show={this.state.show}>
                    {this.state.show ? <Filter handleFilter={this.handleFilter} /> :<div> </div>  }
                    <List message ={this.state.message} playlists={this.state.playlists}/>
                </Main>
                
            </Wrapper>);
    }
}

export default Container;
