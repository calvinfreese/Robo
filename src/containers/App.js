import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from "../components/Scroll";
import './App.css';

import  { requestRobots, setSearchField } from "../redux/actions.js";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch)  => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

const App = (store) => {

    const { searchField, onSearchChange, robots, isPending } = store;
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

   
    useEffect( () => {
        store.onRequestRobots()
    }, [])


    return isPending ? 
    <h1> Loading </h1> :  
        (
        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <CardList robots={filteredRobots}/>
            </Scroll>
            
        </div>
    );
        
        
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);