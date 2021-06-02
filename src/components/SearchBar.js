import React from 'react';
import * as AiIcons from 'react-icons/ai';
const SearchBar = () => {
    const handleSearch = (e) =>{
        
           // this.setState({searchField:e.target.value})
         // set State Params
        console.log(e.target.value)
          };
   
      return (
        <div >
          
            <input
            className="searchBar "
             type='search'
              placeholder="Search text here"
              onChange = {handleSearch}
              
            />
           
             
        
         
          </div>
          
      );
    
  };

  export default SearchBar;