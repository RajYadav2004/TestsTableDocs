// SearchBar.jsx
import { TextField } from '@mui/material'
import React from 'react'

const SearchBar = ({ searchText, handleSearch }) => {
    return (
        <>
            <div className="p-4 space-x-2 bg-gray-100">
                <div className="container mx-auto flex justify-end items-center">
                    <TextField
                        label="Search"
                        size='small'
                        variant='outlined'
                        value={searchText}
                        color='success'
                        fullWidth={true}
                        placeholder='Search Anything Here'
                        onInput={handleSearch}
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar
