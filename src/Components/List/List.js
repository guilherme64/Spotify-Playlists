import React,{ Component } from 'react';
import styled from 'styled-components';
const ListDiv = styled.div`
    self-align: start;
    overflow-y: scroll;
`

const UnorderedList = styled.ul`
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    list-style-type: none;
`
const ListItem = styled.li`
    padding: 10px;
    margin: 5px;
    max-width: 30%;
    text-align: center;
`
const Image = styled.img`
    max-height: 70%;
    max-width: 70%;
    align-items: center;
`
const PlaylistName = styled.span`
    display: block;
    font-size: 20px;
`

const Message = styled.span`
    font-size: 40px;
    text-align: center;
    display: block;
`
class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            playlists:{
                items:[]
            }
        }


    }
    componentDidMount(){
        this.setState({playlists: this.props.playlists});
    }
    render() {
        console.log(this.props);
        console.log(this.state);
        return(<ListDiv>
            <Message>{this.props.message}</Message>
            <UnorderedList>{
                this.props.playlists.items.map(cur => {
                    return <ListItem key={cur.id}>
                        <a target ="_blank" rel="noreferrer" href={cur.external_urls.spotify}>
                            <Image src={cur.images[0].url} alt="Playlist"></Image>
                        </a>
                        <PlaylistName>{cur.name}</PlaylistName>
                        <p>{cur.description}</p>
                    </ListItem>;
                })
             }</UnorderedList>
        </ListDiv>
        );
    }
}

export default List;