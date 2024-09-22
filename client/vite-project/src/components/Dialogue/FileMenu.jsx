import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorE1}) => {
  return (
    <div>
        <Menu  anchorEl={anchorE1} open={false}>Menu</Menu>
    </div>
  )
}

export default FileMenu